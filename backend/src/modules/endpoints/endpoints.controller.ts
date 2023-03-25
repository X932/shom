import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@guards/jwt.guard';
import { EndpointsService } from './endpoints.service';

@UseGuards(JwtAuthGuard)
@Controller('endpoints')
export class EndpointsController {
  constructor(private endpointsService: EndpointsService) {}

  @Get()
  find() {
    return this.endpointsService.find();
  }
}
