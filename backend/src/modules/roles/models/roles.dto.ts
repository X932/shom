import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsNotBlank } from '@decorators/IsNotBlank.decorator';
import { IRole } from './roles.type';
import { EndpointDto } from '../../endpoints/models/endpoints.dto';

export class RoleDto implements Pick<IRole, 'title'> {
  @IsString()
  @IsNotBlank()
  title: string;
}

export class UpdateRoleDto implements IRole {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotBlank()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EndpointDto)
  endpoints: EndpointDto[];
}
