import { IsString, IsNumber } from 'class-validator';
import { IsNotBlank } from '@decorators/IsNotBlank.decorator';
import { BaseProduct } from './products.type';

export class CreateProductDto extends BaseProduct {
  @IsString()
  @IsNotBlank()
  title: string;

  @IsString()
  imgPath: string;

  @IsString()
  @IsNotBlank()
  description: string;

  @IsNumber()
  size: number;

  @IsNumber()
  price: number;
}
