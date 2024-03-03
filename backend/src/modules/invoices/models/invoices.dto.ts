import {
  IsArray,
  IsNumber,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { StatisticType } from './invoices.constant';

class CreateInvoiceDetailsDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  productDetailsId: number;

  @IsNumber()
  quantity: number;
}

export class CreateInvoiceDto {
  @IsNumber()
  accountId: number;

  @IsNumber()
  discount: number;

  @IsArray()
  @ValidateNested()
  @Type(() => CreateInvoiceDetailsDto)
  details: CreateInvoiceDetailsDto[];
}

export class GetStatisticParamsDto {
  @IsDateString(
    { strictSeparator: true, strict: true },
    { message: 'Неправильный формат даты' },
  )
  currentDate: Date;

  @IsNumber({}, { message: 'Неправильный тип' })
  @Transform(({ value }) => Number(value))
  type: StatisticType;
}

export interface TStatisticResponse extends ITotalAmountQueryResult {
  data: IStatisticQueryResult[];
}

export interface ITotalAmountQueryResult {
  totalAmount: number;
}

export interface IStatisticQueryResult {
  amount: number;
  createdAt?: Date;
}
