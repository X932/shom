import { IsNotBlank } from '@decorators/IsNotBlank.decorator';
import { IsOptional, IsString } from 'class-validator';

class UserCredentials {
  @IsString()
  @IsNotBlank()
  phone: string;

  @IsString()
  @IsNotBlank()
  password: string;
}

export class SignInDto extends UserCredentials {}

export class SignUpDto extends UserCredentials {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;
}
