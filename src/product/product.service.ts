import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './product-dto';
import { ProductEntity } from './product.entity';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductService {
    
    constructor(
        @InjectRepository(ProductEntity)
        private readonly repository: Repository<ProductEntity>,
    ) { }
    async paginate(options: IPaginationOptions): Promise<Pagination<ProductDto>> {
        return paginate<ProductDto>(this.repository, options);
    }
}

