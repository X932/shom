import { IsString, IsNumber } from 'class-validator';
import { IsNotBlank } from '@decorators/IsNotBlank.decorator';
import { IProduct } from './products.type';

export class CreateProductDto implements Omit<IProduct, 'id'> {
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
