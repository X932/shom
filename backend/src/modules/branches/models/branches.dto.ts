import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  title: string;
}

export class UpdateBranchDto extends CreateBranchDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  id: number;
}
