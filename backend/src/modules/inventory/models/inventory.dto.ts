import { PaginationDto } from '@common-types/pagination.dto';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetInventoryDto extends PaginationDto {}

export class CreateUpdateInventoryDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  quantity: number;
}
