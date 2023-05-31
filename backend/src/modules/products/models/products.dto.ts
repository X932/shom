import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsNotBlank } from '@decorators/IsNotBlank.decorator';

class CreateProductPriceDto {
  @IsNumber()
  amount: number;
}

class CreateProductDetailsDto {
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
  @IsNotBlank()
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

  @IsNumber()
  amount: number;
}

class UpdateProductDetailsDto extends CreateProductDetailsDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNumber()
  size: number;

  @ValidateNested({ each: true })
  @Type(() => UpdateProductPriceDto)
  price: UpdateProductPriceDto;
}

export class UpdateProductDto extends CreateProductDto {
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
  imgPath: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductDetailsDto)
  details: UpdateProductDetailsDto[];
}
