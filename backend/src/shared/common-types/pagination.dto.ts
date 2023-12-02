import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PaginationDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  rowsLimit: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  rowsOffset: number;
}
