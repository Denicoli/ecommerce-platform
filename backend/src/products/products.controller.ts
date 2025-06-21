import { Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { NormalizedProduct } from './interfaces/product-source.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('sync')
  @HttpCode(HttpStatus.OK)
  sync(): Promise<void> {
    return this.productsService.syncProducts();
  }

  @Get()
  findAll(@Query() query): Promise<NormalizedProduct[]> {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<NormalizedProduct | null> {
    return this.productsService.findOne(id);
  }
}
