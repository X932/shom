import { JwtAuthGuard } from '@guards/jwt.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './models/products.dto';
import { ProductsService } from './products.service';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  create(@Body() product: CreateProductDto) {
    return this.productsService.create(product);
  }
}
