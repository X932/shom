import { JwtAuthGuard } from '@guards/jwt.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  create(@Body() product: any) {
    return this.productsService.create(product);
  }
}
