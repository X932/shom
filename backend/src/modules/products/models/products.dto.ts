import { IsString, IsNumber, IsOptional } from 'class-validator';
import { IsNotBlank } from '@decorators/IsNotBlank.decorator';
import { BaseProduct } from './products.type';

export class CreateProductDto extends BaseProduct {
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
