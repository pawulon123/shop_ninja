import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('role')
export class RoleEntity {

    @PrimaryGeneratedColumn()
id: number;
    
    @Column({type: 'varchar',  length: 20})
name: string;
}
