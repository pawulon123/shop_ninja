import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './product-dto';
import { ProductEntity } from './product.entity';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import {Query} from '../shared/query';

@Injectable()
export class ProductService {
    
    constructor(
        private query: Query,
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
       
    ) { }
    async paginate(options: IPaginationOptions): Promise<Pagination<ProductDto>> {
        return paginate<ProductDto>(this.productRepository, options);
    }
    async withCategories(categories: string[]):Promise<any>{
        return this.query.ProductsWithCategory(categories);
            // or second way
        // return this.query.CategoriesWithProduct(categories);
    }   
}

