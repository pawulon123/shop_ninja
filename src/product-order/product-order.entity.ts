import { Entity, Column, PrimaryColumn } from 'typeorm';
@Entity('products_orders')
export class ProductOrderEntity {

        @PrimaryColumn({type: 'integer', unsigned: true })
    products:number;
    
        @PrimaryColumn({type: 'integer', unsigned: true })    
    orders:number;
       
        @Column({type: 'integer', unsigned: true })
    amount:number;

        @Column()
    created_at:number;

        @Column()
    updated_at:number;
}
