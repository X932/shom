import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import {
  addWeeks,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceDetailsEntity } from './models/invoice-details.entity';
import { CreateInvoiceDto, GetStatisticParamsDto } from './models/invoices.dto';
import {
  IMonthlyStatisticQueryResult,
  IStatistic,
  IWeeklyStatisticQueryResult,
  IStatisticResponse,
} from './models/invoices.type';
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
    @InjectRepository(InvoicesEntity)
    private readonly invoicesRepository: Repository<InvoicesEntity>,
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

  private async getMonthlyStatistic(
    currentDate: Date,
  ): Promise<IStatisticResponse> {
    const startMonthDate = format(
      startOfMonth(currentDate),
      'yyyy-MM-dd HH:mm:ss',
    );
    const endMonthDate = format(endOfMonth(currentDate), 'yyyy-MM-dd HH:mm:ss');

    const invoices: IMonthlyStatisticQueryResult[] =
      await this.invoicesRepository
        .createQueryBuilder('invoice')
        .select('CAST(SUM(invoice.net_amount) AS FLOAT)', 'amount')
        .addSelect(
          "DATE_PART('WEEK', CAST(invoice.created_at AS DATE))",
          'weekNumber',
        )
        .where('invoice.created_at BETWEEN :startDate AND :endDate', {
          startDate: startMonthDate,
          endDate: endMonthDate,
        })
        .groupBy("DATE_PART('WEEK', CAST(invoice.created_at AS DATE))")
        .orderBy("DATE_PART('WEEK', CAST(invoice.created_at AS DATE))")
        .getRawMany();

    let maxAmount = 0;
    const statistic = invoices.reduce<IStatistic[]>(
      (previousValue, currentValue) => {
        if (maxAmount < currentValue.amount) {
          maxAmount = currentValue.amount;
        }

        const startDay = startOfWeek(
          addWeeks(startOfYear(currentDate), currentValue.weekNumber - 1),
          { weekStartsOn: MONDAY_INDEX },
        );
        const endDay = endOfWeek(startDay, { weekStartsOn: MONDAY_INDEX });

        const income: IStatistic = {
          amount: currentValue.amount,
          period: `${format(startDay, 'dd.MM.yyyy')}-${format(
            endDay,
            'dd.MM.yyyy',
          )}`,
        };
        // TODO till creating expenses
        const expense: IStatistic = {
          amount: 130,
          period: '',
        };
        return [...previousValue, income, expense];
      },
      [],
    );

    return {
      maxAmount: maxAmount,
      data: statistic,
    };
  }

  private async getWeeklyStatistic(
    currentDate: Date,
  ): Promise<IStatisticResponse> {
    const startWeekDate = format(
      startOfWeek(currentDate, { weekStartsOn: MONDAY_INDEX }),
      'yyyy-MM-dd HH:mm:ss',
    );
    const endWeekDate = format(
      endOfWeek(currentDate, { weekStartsOn: MONDAY_INDEX }),
      'yyyy-MM-dd HH:mm:ss',
    );

    const invoices: IWeeklyStatisticQueryResult[] =
      await this.invoicesRepository
        .createQueryBuilder('invoice')
        .select('CAST(SUM(invoice.net_amount) AS FLOAT)', 'amount')
        .addSelect('CAST(invoice.created_at AS DATE)', 'createdAt')
        .where('invoice.created_at BETWEEN :startDate AND :endDate', {
          startDate: startWeekDate,
          endDate: endWeekDate,
        })
        .groupBy('CAST(invoice.created_at AS DATE)')
        .orderBy('CAST(invoice.created_at AS DATE)')
        .getRawMany();

    let maxAmount = 0;
    const statistic = invoices.reduce<IStatistic[]>(
      (previousValue, currentValue) => {
        if (maxAmount < currentValue.amount) {
          maxAmount = currentValue.amount;
        }

        const income: IStatistic = {
          amount: currentValue.amount,
          period: format(currentValue.createdAt, 'dd.MM.yyyy'),
        };
        // TODO till creating expenses
        const expense: IStatistic = {
          amount: 120,
          period: '',
        };
        return [...previousValue, income, expense];
      },
      [],
    );

    return {
      maxAmount: maxAmount,
      data: statistic,
    };
  }

  public async getStatistic(
    getStatisticParams: GetStatisticParamsDto,
  ): Promise<IStatisticResponse> {
    const { currentDate, type } = getStatisticParams;

    try {
      switch (type) {
        case StatisticType.WEEK:
          return this.getWeeklyStatistic(currentDate);

        case StatisticType.MONTH:
          return this.getMonthlyStatistic(currentDate);

        default:
          break;
      }
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
