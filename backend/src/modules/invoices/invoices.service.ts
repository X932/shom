import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceDetailsEntity } from './models/invoice-details.entity';
import { CreateInvoiceDto } from './models/invoices.dto';
import { InvoicesEntity } from './models/invoices.entity';
import { AccountsHistoryEntity } from '../accounts-history/models/accounts-history.entity';
import { ACCOUNT_HISTORY_TYPES } from '../accounts-history/models/accounts-history.constant';
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

        const newAccountHistory = new AccountsHistoryEntity();
        newAccountHistory.account = foundAccount;
        newAccountHistory.amount = newInvoice.netAmount;
        newAccountHistory.description = 'Продажа продуктов';
        newAccountHistory.isExcludedFromStatistic = false;
        newAccountHistory.type = ACCOUNT_HISTORY_TYPES.INCOME;
        await manager.save(newAccountHistory);
      });
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
