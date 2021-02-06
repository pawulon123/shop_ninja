import { OrderEntity } from './../order/order.entity';
import { Injectable } from '@nestjs/common';
import { getConnection, Like, getRepository } from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { ProductEntity } from '../product/product.entity';

@Injectable()
export class Query {

    async CategoriesWithProduct(categories: string[]): Promise<CategoryEntity[]> {
        return await getConnection()
            .getRepository(CategoryEntity)
            .createQueryBuilder("category")
            .leftJoinAndSelect("category.products", "product")
            .where("category.name IN (:...names)", { names: categories })
            .getMany();
    }
    async ProductsWithCategory(categories: string[]): Promise<ProductEntity[]> {
        return await getConnection()
            .getRepository(ProductEntity)
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.category", "category")
            .where("category.name IN (:...names)", { names: categories })
            .getMany();
    }
    async filtrBYname(pattern: string): Promise<ProductEntity[]> {
        return await getConnection()
            .getRepository(ProductEntity)
            .createQueryBuilder("product")
            .where('product.name like :name', { name: `%${pattern}%` })
            .getMany();
    }
    async getOrders(): Promise<OrderEntity[]> {
        return await getConnection()
            .getRepository(OrderEntity)
            .createQueryBuilder("order")
            .leftJoinAndSelect("order.user", "user")
            .leftJoinAndSelect("order.products", "product")
            .getMany();
    }
    async addOne(order): Promise<any> {
        // there must be a fix !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
            const answer= await getConnection()            
            .createQueryBuilder()
            .relation(OrderEntity, "products")
            .insert()
            .into(OrderEntity)
            .values(order)
            .execute();
            const idOrder =answer['identifiers'][0].id
            order.products.forEach(idProduct => {
            getConnection().query(`INSERT INTO orders_products (products, orders ) VALUES (${idProduct},${idOrder})`)});
            return idOrder;
        }
        
    

}