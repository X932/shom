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
  id: number;
  amount: number;
}

class ProductDetailsDto {
  id: number;
  size: number;
  description: string;
  price: ProductPriceDto;
}

export class UpdateProductDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotBlank()
  title: string;

  @IsString()
  @IsNotBlank()
  imgPath: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDetailsDto)
  details: ProductDetailsDto[];
}
