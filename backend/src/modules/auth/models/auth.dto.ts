import { IsString, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  public phone: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  public phone: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
