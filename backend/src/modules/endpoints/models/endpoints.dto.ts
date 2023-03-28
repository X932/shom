import { IsNumber, IsString } from 'class-validator';

export class EndpointDto {
  @IsNumber()
  id: number;

  @IsString()
  key: string;

  @IsString()
  title: string;
}

export class CreateEndpointDto {
  @IsString()
  key: string;

  @IsString()
  title: string;
}
