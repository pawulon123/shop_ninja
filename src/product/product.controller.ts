import { Controller, Get, Query, ParseIntPipe, Logger, ParseArrayPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product-dto';
import { ProductEntity } from './product.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('product')
export class ProductController {
    constructor(public readonly productService: ProductService) { }
    
    @Get() //http://localhost:3001/product?page=1&limit=10
    async index(
        @Query('page', ParseIntPipe) page: number ,
        @Query('limit', ParseIntPipe) limit: number ,
    ): Promise<Pagination<ProductDto>> {
        limit = limit > 100 ? 100 : limit;
        return this.productService.paginate({
            page ,
            limit,
            route: 'http://localhost:3001/product',
        });
    }
    @Get('category') //http://localhost:3001/product/category?categories=swords,ninja+stars
    async getAllWithCategoryies(
        @Query('categories', ParseArrayPipe) categories: string[]
    ){
       return this.productService.withCategories(categories)
    }

}

