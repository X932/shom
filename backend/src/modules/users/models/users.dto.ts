import { IsNumber } from 'class-validator';
import { RoleDto } from '../../roles/models/roles.dto';
import { SignUpDto } from '../../auth/models/auth.dto';

export class UserDto extends SignUpDto {
  @IsNumber()
  id: number;

  @IsNumber()
  role?: RoleDto;
}
