import { Controller, Get, Query, ParseIntPipe, Logger, ParseArrayPipe, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product-dto';
import { ProductEntity } from './product.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ParamsPattern } from './params.pattern';

@Controller('product')
export class ProductController {
    constructor(public readonly productService: ProductService) { }
    
    @Get() //http://localhost:3001/product?page=1&limit=10
    allPaginate(
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
    getAllWithCategoryies(
        @Query('categories', ParseArrayPipe) categories: string[]
    ): Promise<ProductDto[]>{
       return this.productService.withCategories(categories)
    }
    @Get(':pattern') //http://localhost:3001/product/a [pattern]
    filterByName(@Param() params: ParamsPattern): Promise<ProductDto[]>{
        return this.productService.filterByName(params.pattern);
    }
}

