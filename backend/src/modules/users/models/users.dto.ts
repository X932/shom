import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RoleIdDto } from '../../roles/models/roles.dto';
import { SignUpDto } from '../../auth/models/auth.dto';

export class UserDto extends SignUpDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Роль не должна быть пустой' })
  @Type(() => RoleIdDto)
  @ValidateNested({ each: true })
  role?: RoleIdDto;
}

export class UpdateUserDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  password?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Роль не должна быть пустой' })
  @Type(() => RoleIdDto)
  @ValidateNested({ each: true })
  role?: RoleIdDto;
}
