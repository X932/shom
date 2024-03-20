import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@guards/jwt.guard';
import { ROUTES } from '@constants/routes';
import { CreateEndpointDto, EndpointDto } from './models/endpoints.dto';
import { EndpointsService } from './endpoints.service';

@UseGuards(JwtAuthGuard)
@Controller(ROUTES.ENDPOINTS)
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

  @Delete()
  delete(@Query('id', ParseIntPipe) id: number) {
    return this.endpointsService.delete(id);
  }
}
