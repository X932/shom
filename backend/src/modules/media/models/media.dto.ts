import { IsNotEmpty, IsString } from 'class-validator';
import { IsNotBlank } from '@decorators/IsNotBlank.decorator';

export class DeleteMediaDto {
  @IsNotEmpty()
  @IsString()
  @IsNotBlank()
  path: string;
}
