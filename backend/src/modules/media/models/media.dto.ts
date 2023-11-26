import { IsNotBlank } from '@decorators/IsNotBlank.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteMediaDto {
  @IsNotEmpty()
  @IsString()
  @IsNotBlank()
  path: string;
}
