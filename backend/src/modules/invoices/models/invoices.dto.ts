import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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
