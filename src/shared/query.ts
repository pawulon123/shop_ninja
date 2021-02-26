import { OrderEntity } from './../order/order.entity';
import { Injectable } from '@nestjs/common';
import { getConnection, Like, getRepository } from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { ProductEntity } from '../product/product.entity';
import { UserEntity } from '../user/user.entity';
import { OrderDto } from '../order/order-dto';
import { ProductOrderEntity } from '../product-order/product-order.entity';


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
    async addOrder(order: OrderDto): Promise<OrderDto> {
        const connect = getConnection()
        const savedOrder = await connect.getRepository(OrderEntity).save(order);
        // need to improve
        await this.updateorders_products(savedOrder, connect);
        return savedOrder;
    }
    async updateorders_products(savedOrder: OrderDto, connect) {
        const objectsUpdated = savedOrder.products.map(async product => {
            const amount = 'amount' in product ? product['amount'] : 1
            await connect.query(`UPDATE orders_products SET amount=${amount} WHERE orders=${savedOrder.id} AND products=${product.id}`)
        })
        // connect.close() /*?*/
        return objectsUpdated;
    }
    async getProducts(productsIds): Promise<ProductEntity[]> {
        return await getConnection()
            .getRepository(ProductEntity)
            .createQueryBuilder("product")
            .where("product.id IN (:...ids)", { ids: productsIds })
            .getMany();
    }
    async userOrder(order: OrderEntity): Promise<any> {
        return await getConnection()
            .getRepository(OrderEntity)
            .createQueryBuilder("order")
            .leftJoinAndSelect("order.user", "user")
            .leftJoinAndSelect("order.products", "product")
            .where('order.id = :id', { id: order.id })
            .getOne();
    }
    async user(id: number): Promise<any> {
        return await getConnection().getRepository(UserEntity).findOneOrFail(id)
    }
    async productsHightAmount(from: string, to: string): Promise<ProductEntity[]> {
        return await getConnection().query(
            `
            SELECT products.* , 
            SUM (amount) AS frequentlyProduct
            FROM orders_products 
            INNER JOIN products ON orders_products.products=products.id  
            WHERE created_at BETWEEN "${from}" AND "${to}"
            GROUP BY products
            ORDER BY frequentlyProduct DESC
            LIMIT 1
            `
       )
    }
}