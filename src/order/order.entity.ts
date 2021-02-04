import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, JoinTable, ManyToMany } from "typeorm";
import { UserEntity as User }from "../user/user.entity";
import { ProductEntity as Product }from "../product/product.entity";
@Entity('orders')
export class OrderEntity {
        
        @PrimaryGeneratedColumn()
    id: number;
    
        @Column({type: 'integer', unsigned: true, nullable: true })
    id_user: number;

        @Column({type: 'varchar' })
    status: string;
    
    @ManyToOne(() => User, user => user.orders)
        @JoinColumn({ name: 'id_user' })
        user: User;

    @ManyToMany(type => Product)
        @JoinTable({
        name: "orders_userclient",
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

