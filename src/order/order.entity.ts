import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, JoinTable, ManyToMany } from "typeorm";
import { UserEntity as User }from "../user/user.entity";
import { ProductEntity as Product }from "../product/product.entity";
import { Optional } from "@nestjs/common";

@Entity('orders')
export class OrderEntity {

        @Optional()
        @PrimaryGeneratedColumn()
    id: number;
    
        @Column({type: 'integer', unsigned: true })
    id_user: number;
 
        @Column({type: 'integer', unsigned: true })
    total_cost: number;
        
          @Column({type: 'varchar', default: 'pending' })
    status: string;
    
    @ManyToOne(() => User, user => user.orders)
        @JoinColumn({ name: 'id_user' })
        user: User;

    @ManyToMany(type => Product, {
        cascade: true
    })
        @JoinTable({
        name: "orders_products",
        joinColumn: {
            name: "orders",
            referencedColumnName: "id"  
        },
        inverseJoinColumn: {    
            name: "products",
            referencedColumnName: "id"
        }
        })
        products: Product[];
}

