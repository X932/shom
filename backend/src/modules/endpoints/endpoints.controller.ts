import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@guards/jwt.guard';
import { CreateEndpointDto } from './models/endpoints.dto';
import { EndpointsService } from './endpoints.service';

@UseGuards(JwtAuthGuard)
@Controller('endpoints')
export class EndpointsController {
  constructor(private endpointsService: EndpointsService) {}

  @Post()
  create(@Body() endpoint: CreateEndpointDto) {
    return this.endpointsService.create(endpoint);
  }
}
