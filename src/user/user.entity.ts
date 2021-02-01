import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}
