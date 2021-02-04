import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { OrderEntity as Order }from "../order/order.entity";
import { RoleEntity as Role }from "../role/role.entity";

@Entity('users')
export class UserEntity {
    
        @PrimaryGeneratedColumn()
    id: number;
    
        @Column({type: 'integer', unsigned: true, nullable: true })
    id_role: number;
    
        @Column({type: 'varchar',length: 254, unique: true, nullable: true })
    mail: string;
    
        @Column({type: 'char', unsigned: true, length: 60, nullable: true})
    password: string;
        
        @Column({type: 'varchar',  length: 100})
    adress: string;

    @OneToMany(() => Order, order => order.user)
        orders: Order[];

    @OneToOne(() => Role)
        @JoinColumn({ name: 'id_role' })
        role: Role;
}
