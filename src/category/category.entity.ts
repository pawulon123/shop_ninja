import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductEntity as Product } from '../product/product.entity';

@Entity('categories')
export class CategoryEntity {

    @PrimaryGeneratedColumn()
id: number;

    @Column({type: 'varchar',  length: 30})
name: string;

@OneToMany(() => Product, product => product.category)
products: Product[];
}
