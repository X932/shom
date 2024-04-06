import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ACCOUNT_HISTORY_TYPES,
  StatisticType,
} from './accounts-history.constant';

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

export class CreateAccountHistoryDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  description?: string;

  @IsNumber({}, { message: 'Неправильный счёт' })
  accountId: number;

  @IsNumber({}, { message: 'Сумма должна быть больше 0' })
  amount: number;

  @IsDateString(
    { strictSeparator: true, strict: true },
    { message: 'Неправильный формат даты' },
  )
  createdAt: Date;

  @IsEnum(ACCOUNT_HISTORY_TYPES, { message: 'Тип неверный' })
  type: ACCOUNT_HISTORY_TYPES;
}
