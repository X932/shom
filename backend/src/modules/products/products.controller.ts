import { JwtAuthGuard } from '@guards/jwt.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { TrimPipe } from '@pipes/trim.pipe';
import { CreateProductDto, UpdateProductDto } from './models/products.dto';
import { ProductsService } from './products.service';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @UsePipes(TrimPipe)
  create(@Body() product: CreateProductDto) {
    return this.productsService.create(product);
  }

  @Get()
  find(@Query('id') id?: string) {
    return this.productsService.find({ id: Number(id) || undefined });
  }

  @Put()
  @UsePipes(TrimPipe)
  update(@Body() product: UpdateProductDto) {
    return this.productsService.update(product);
  }
}
