import { Transform } from 'class-transformer';
import { IsDateString, IsNumber } from 'class-validator';
import { StatisticType } from './accounts-history.constant';

export class GetStatisticParamsDto {
  @IsDateString(
    { strictSeparator: true, strict: true },
    { message: 'Неправильный формат даты' },
  )
  currentDate: Date;

  @IsNumber({}, { message: 'Неправильный тип' })
  @Transform(({ value }) => Number(value))
  type: StatisticType;
}
