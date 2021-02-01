import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}
