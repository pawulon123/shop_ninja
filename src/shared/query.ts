import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { ProductEntity } from '../product/product.entity';

@Injectable()
export class Query {

    async CategoriesWithProduct(categories: string[]) {
        return await getConnection()
            .getRepository(CategoryEntity)
            .createQueryBuilder("category")
            .leftJoinAndSelect("category.products", "product")
            .where("category.name IN (:...names)", { names:categories })
            .getMany();
    }
    async ProductsWithCategory(categories: string[]) {
        return await getConnection()
            .getRepository(ProductEntity)
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.category", "category")
            .where("category.name IN (:...names)", { names:categories})
            .getMany();

    }

}

