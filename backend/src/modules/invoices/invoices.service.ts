import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { endOfWeek, format, startOfWeek } from 'date-fns';
import { InvoiceDetailsEntity } from './models/invoice-details.entity';
import {
  CreateInvoiceDto,
  GetStatisticParamsDto,
  IStatisticQueryResult,
  ITotalAmountQueryResult,
  TStatisticResponse,
} from './models/invoices.dto';
import { InvoicesEntity } from './models/invoices.entity';
import { MONDAY_INDEX, StatisticType } from './models/invoices.constant';
import { AccountsService } from '../accounts/accounts.service';
import { ProductsEntity } from '../products/models/products.entity';
import { AccountsEntity } from '../accounts/models/accounts.entity';
import { ProductsDetailsService } from '../products/products-details.service';
import { InventoryEntity } from '../inventory/models/inventory.entity';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly productDetailsService: ProductsDetailsService,
    private readonly accountsService: AccountsService,
    private readonly dataSource: DataSource,
  ) {}

  public async create(createInvoiceDto: CreateInvoiceDto) {
    const isAccountExist: boolean = await this.accountsService.isExist(
      createInvoiceDto.accountId,
    );

    if (!isAccountExist) {
      throw new BadRequestException('Счёт неверный');
    }

    let totalAmount = 0;

    const invoiceDetailsQuantity = createInvoiceDto.details.length;
    const remainderDiscount =
      createInvoiceDto.discount % invoiceDetailsQuantity;
    const integerDiscount = Math.floor(
      createInvoiceDto.discount / invoiceDetailsQuantity,
    );
    const savedInvoiceDetails: InvoiceDetailsEntity[] = [];
    try {
      await this.dataSource.transaction(async (manager: EntityManager) => {
        for (let index = 0; index < createInvoiceDto.details.length; index++) {
          const invoiceDetails = createInvoiceDto.details[index];

          const foundProduct = await manager.findOneBy(ProductsEntity, {
            id: invoiceDetails.productId,
          });
          const foundProductDetails = await this.productDetailsService.getById(
            invoiceDetails.productDetailsId,
          );

          if (!foundProduct) {
            throw new BadRequestException('Продукт не найден');
          }

          if (
            foundProductDetails.inventory.quantity < invoiceDetails.quantity ||
            invoiceDetails.quantity <= 0
          ) {
            throw new BadRequestException(
              `${invoiceDetails.quantity} шт продукта «${foundProduct.title}» нет на складе`,
            );
          }

          totalAmount += foundProductDetails.price.amount;

          await manager.update(
            InventoryEntity,
            {
              id: foundProductDetails.inventory.id,
            },
            {
              quantity:
                foundProductDetails.inventory.quantity -
                invoiceDetails.quantity,
            },
          );

          const foundAccount: AccountsEntity | null = await manager.findOneBy(
            AccountsEntity,
            {
              id: createInvoiceDto.accountId,
            },
          );
          const currentAccountAmount = foundAccount.amount;

          const updatedAccountAmount =
            index + 1 === invoiceDetailsQuantity
              ? // is last iteration
                currentAccountAmount +
                foundProductDetails.price.amount -
                integerDiscount -
                remainderDiscount
              : currentAccountAmount +
                foundProductDetails.price.amount -
                integerDiscount;

          await manager.update(
            AccountsEntity,
            {
              id: foundAccount.id,
            },
            {
              amount: updatedAccountAmount * invoiceDetails.quantity,
            },
          );

          const newInvoiceDetails = new InvoiceDetailsEntity();
          if (index + 1 === invoiceDetailsQuantity) {
            newInvoiceDetails.discount = integerDiscount + remainderDiscount;
          } else {
            newInvoiceDetails.discount = integerDiscount;
          }
          newInvoiceDetails.quantity = invoiceDetails.quantity;
          newInvoiceDetails.product = foundProduct;
          newInvoiceDetails.productDetails = foundProductDetails;
          const savedInvoiceDetail = await manager.save(newInvoiceDetails);
          savedInvoiceDetails.push(savedInvoiceDetail);
        }

        if (totalAmount < createInvoiceDto.discount) {
          throw new BadRequestException('Скидка больше суммы цен товаров');
        }

        const foundAccount: AccountsEntity | null = await manager.findOneBy(
          AccountsEntity,
          {
            id: createInvoiceDto.accountId,
          },
        );

        const newInvoice = new InvoicesEntity();
        newInvoice.grossAmount = totalAmount - createInvoiceDto.discount;
        newInvoice.netAmount = totalAmount - createInvoiceDto.discount;
        newInvoice.account = foundAccount;
        newInvoice.invoiceDetails = savedInvoiceDetails;
        await manager.save(newInvoice);
      });
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  private async getWeeklyStatistic(
    currentDate: Date,
  ): Promise<TStatisticResponse> {
    const startWeekDate = format(
      startOfWeek(currentDate, { weekStartsOn: MONDAY_INDEX }),
      'yyyy-MM-dd HH:mm:ss',
    );
    const endWeekDate = format(
      endOfWeek(currentDate, { weekStartsOn: MONDAY_INDEX }),
      'yyyy-MM-dd HH:mm:ss',
    );

    return await this.dataSource.transaction(async (manager: EntityManager) => {
      const { totalAmount }: ITotalAmountQueryResult = await manager
        .createQueryBuilder(InvoicesEntity, 'invoice')
        .select('CAST(SUM(invoice.net_amount) AS FLOAT)', 'totalAmount')
        .where('invoice.created_at BETWEEN :startDate AND :endDate', {
          startDate: startWeekDate,
          endDate: endWeekDate,
        })
        .getRawOne();

      const invoices: IStatisticQueryResult[] = await manager
        .createQueryBuilder(InvoicesEntity, 'invoice')
        .select('CAST(SUM(invoice.net_amount) AS FLOAT)', 'amount')
        .addSelect('CAST(invoice.created_at AS DATE)', 'createdAt')
        .where('invoice.created_at BETWEEN :startDate AND :endDate', {
          startDate: startWeekDate,
          endDate: endWeekDate,
        })
        .groupBy('CAST(invoice.created_at AS DATE)')
        .orderBy('CAST(invoice.created_at AS DATE)')
        .getRawMany();

      return {
        totalAmount: totalAmount,
        data: invoices.reduce<IStatisticQueryResult[]>(
          (previousValue, currentValue) => {
            // TODO till creating expenses
            return [...previousValue, currentValue, { amount: 130 }];
          },
          [],
        ),
      };
    });
  }

  public async getStatistic(
    getStatisticParams: GetStatisticParamsDto,
  ): Promise<TStatisticResponse> {
    const { currentDate, type } = getStatisticParams;

    try {
      if (type === StatisticType.WEEK) {
        return this.getWeeklyStatistic(currentDate);
      }
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
