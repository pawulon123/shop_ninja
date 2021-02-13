import { OrderEntity } from './../order/order.entity';
import { Injectable } from '@nestjs/common';
import { getConnection, Like, getRepository } from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { ProductEntity } from '../product/product.entity';
import { UserEntity } from '../user/user.entity';
import { OrderDto } from '../order/order-dto';

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
    async addOrder(order: OrderDto): Promise<OrderEntity> { 
        return await getConnection().getRepository(OrderEntity).save(order)
    }
    async getProducts(productsIds): Promise<ProductEntity[]> {
        // const productsIds = order.products.map(product => product.id);
        return await getConnection()
            .getRepository(ProductEntity)
            .createQueryBuilder("product")
            .where("product.id IN (:...ids)", { ids: productsIds })
            .getMany();
    }
    async userOrder(order: OrderEntity): Promise<any> {
        return  await getConnection()
            .getRepository(OrderEntity)
            .createQueryBuilder("order")
            .leftJoinAndSelect("order.user", "user")
            .leftJoinAndSelect("order.products", "product")
            .where('order.id = :id', { id: order.id })
            .getOne();
    }
    async user(id: number): Promise<any> {
        return  await getConnection() .getRepository(UserEntity).findOneOrFail(id)
    }




}