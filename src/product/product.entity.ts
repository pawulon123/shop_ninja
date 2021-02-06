import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { CategoryEntity as Category } from '../category/category.entity';
import { OrderEntity as Order } from '../order/order.entity';

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
        @Column({type: 'integer', unsigned: true, nullable: false })
    category_id: number;
    
        @Column({type: 'varchar',length: 100, nullable: true })
    name: string;
    
        @Column({type: 'varchar', length: 255, nullable: true})
    images_url: string;
        
        @Column({type: 'integer'})
    price: number;
        
        @Column({type: 'varchar', length: 500})
    description: string;
    
    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Category;
  
    // @ManyToMany(type => Order,{
    //     cascade: true
    // })
    //     @JoinTable({
    //     name: "orders_products",
    //     joinColumn: {
    //         name: "products",
    //         referencedColumnName: "id"  
    //     },
    //     inverseJoinColumn: {    
    //         name: "orders",
    //         referencedColumnName: "id"
    //     }
    //     })
        
    //     orders:Order[]

}
