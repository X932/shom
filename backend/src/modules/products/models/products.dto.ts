import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { IsNotBlank } from '@decorators/IsNotBlank.decorator';
import { PaginationDto } from '@common-types/pagination.dto';
import { CreateUpdateInventoryDto } from '../../inventory/models/inventory.dto';

export class GetProductDto extends PaginationDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  title: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  id: number;
}

class CreateProductPriceDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  amount: number;
}

class CreateProductDetailsDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  quantity: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  branchId: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  size: number;

  @ValidateNested({ each: true })
  @Type(() => CreateProductPriceDto)
  price: CreateProductPriceDto;
}

export class CreateProductDto {
  @IsString()
  @IsNotBlank()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotBlank()
  imgPath: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDetailsDto)
  details: CreateProductDetailsDto[];
}

class UpdateProductPriceDto extends CreateProductPriceDto {
  @IsOptional()
  @IsNumber()
  id?: number;
}

class UpdateProductDetailsDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  size: number;

  @ValidateNested({ each: true })
  @Type(() => UpdateProductPriceDto)
  price: UpdateProductPriceDto;

  @ValidateNested({ each: true })
  @Type(() => CreateUpdateInventoryDto)
  inventory: CreateUpdateInventoryDto;
}

export class UpdateProductDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotBlank()
  imgPath: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductDetailsDto)
  details: UpdateProductDetailsDto[];
}
