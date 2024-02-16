import { JwtAuthGuard } from '@guards/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { TrimPipe } from '@pipes/trim.pipe';
import {
  CreateProductDto,
  GetProductDto,
  UpdateProductDto,
} from './models/products.dto';
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
  find(@Query() getProductsDto: GetProductDto) {
    return this.productsService.find(getProductsDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Put()
  @UsePipes(TrimPipe)
  update(@Body() product: UpdateProductDto) {
    return this.productsService.update(product);
  }

  @Delete()
  delete(@Query('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
