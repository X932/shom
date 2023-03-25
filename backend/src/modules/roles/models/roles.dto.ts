import { IsString } from 'class-validator';
import { IsNotBlank } from '@decorators/IsNotBlank.decorator';

export class CreateRoleDto {
  @IsString()
  @IsNotBlank()
  title: string;
}
