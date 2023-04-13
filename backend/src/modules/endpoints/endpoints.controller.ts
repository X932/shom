import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@guards/jwt.guard';
import { CreateEndpointDto, EndpointDto } from './models/endpoints.dto';
import { EndpointsService } from './endpoints.service';

@UseGuards(JwtAuthGuard)
@Controller('endpoints')
export class EndpointsController {
  constructor(private endpointsService: EndpointsService) {}

  @Post()
  create(@Body() endpoint: CreateEndpointDto) {
    return this.endpointsService.create(endpoint);
  }

  @Get()
  find() {
    return this.endpointsService.find();
  }

  @Put()
  update(@Body() endpoint: EndpointDto) {
    return this.endpointsService.update(endpoint);
  }
}
