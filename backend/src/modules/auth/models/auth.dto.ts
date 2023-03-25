import { IsString } from 'class-validator';
import { IsNotBlank } from '@decorators/IsNotBlank.decorator';

export class SignUpDto {
  @IsString()
  @IsNotBlank()
  phone: string;

  @IsString()
  @IsNotBlank()
  password: string;
}

export class SignInDto {
  @IsString()
  @IsNotBlank()
  phone: string;

  @IsString()
  @IsNotBlank()
  password: string;
}
