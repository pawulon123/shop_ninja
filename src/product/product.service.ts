import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './product-dto';
import { ProductEntity } from './product.entity';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Query } from '../shared/query';

@Injectable()
export class ProductService {
    private lastOrder: ProductDto[];
    constructor(
        private readonly query: Query,
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) { }
    async paginate(options: IPaginationOptions): Promise<Pagination<ProductEntity>> {
        return paginate<ProductEntity>(this.productRepository, options);
    }
    async withCategories(categories: string[]): Promise<ProductDto[]> {
        return this.query.ProductsWithCategory(categories);
        // or second way
        // return this.query.CategoriesWithProduct(categories);
    }
    async filterByName(pattern: string): Promise<ProductDto[]> {
        return this.query.filtrBYname(pattern)
    }
    async findOne(id: number): Promise<ProductDto> {
        return this.productRepository.findOneOrFail(id);
    }
    async countProductsCost(products: any[]): Promise<number> {
            
        const ids: number[] = products.map(product => product.id);
        const prod: ProductDto[] = await this.query.getProducts(ids);
        return this.countCost(products, prod)
    }
    private countCost(productsReq: any[], products: ProductDto[]): number {
        return productsReq.reduce((number, product) => {
            const amount: number = 'amount' in product ? product['amount'] : 1;
            this.lastOrder = products.map(prod => {
                if (prod.id === product.id) {
                    prod.inTotal = amount * prod.price;
                    number += prod.inTotal;
                    prod.amount = amount;
                }
                return prod;
            });
            return number;
        }, 0);
    }
    get getLastOrder() {
        return this.lastOrder;
    }
}


