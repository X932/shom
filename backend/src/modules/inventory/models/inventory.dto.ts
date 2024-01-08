import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationDto } from '../../../shared/common-types/pagination.dto';

export class GetInventoryDto extends PaginationDto {}

export class CreateUpdateInventoryDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  quantity: number;
}
