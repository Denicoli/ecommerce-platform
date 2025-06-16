import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post('sync')
    sync(): Promise<void> {
        return this.productsService.syncProducts();
    }

    @Get()
    findAll(@Query() query): Promise<any[]> {
        return this.productsService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<any> {
        return this.productsService.findOne(id);
    }
}
