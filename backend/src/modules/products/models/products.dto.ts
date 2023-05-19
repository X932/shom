import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsNotBlank } from '@decorators/IsNotBlank.decorator';
import { CreateProduct } from './products.type';

export class CreateProductDto extends CreateProduct {
  @IsString()
  @IsNotBlank()
  title: string;

  @IsString()
  @IsNotBlank()
  imgPath: string;

  @IsString()
  @IsNotBlank()
  @IsOptional()
  description: string;

  @IsNumber()
  size: number;

  @IsNumber()
  price: number;
}

class ProductPriceDto {
  @IsNumber()
  id: number;

  @IsNumber()
  amount: number;
}

class ProductDetailsDto {
  @IsNumber()
  id: number;

  @IsNumber()
  size: number;

  @Type(() => ProductPriceDto)
  price: ProductPriceDto;
}

export class UpdateProductDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotBlank()
  title: string;

  @IsString()
  @IsOptional()
  @IsNotBlank()
  description: string;

  @IsString()
  @IsNotBlank()
  @IsNotBlank()
  imgPath: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDetailsDto)
  details: ProductDetailsDto[];
}
