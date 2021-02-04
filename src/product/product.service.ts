import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './product-dto';
import { ProductEntity } from './product.entity';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Query as Quiries } from '../shared/query';

@Injectable()
export class ProductService {
    
    constructor(
        private readonly query: Quiries ,
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) {}
    async paginate(options: IPaginationOptions): Promise<Pagination<ProductDto>> {
        return paginate<ProductDto>(this.productRepository, options);
    }
    async withCategories(categories: string[]): Promise<ProductDto[]>{
        return this.query.ProductsWithCategory(categories);
            // or second way
        // return this.query.CategoriesWithProduct(categories);
    }
    async filterByName(pattern:string): Promise<ProductDto[]> {
        return this.query.filtrBYname(pattern)
    }   
    async findOne(id: number): Promise<ProductDto> {
        return this.productRepository.findOneOrFail(id);
    }   
}

