import {  IsNotEmpty, IsInt, IsOptional, IsPositive, ArrayNotEmpty, Length } from 'class-validator';

export class OrderDto {

        @IsOptional()
        @IsNotEmpty()
        @IsPositive()
        @IsInt()
    id: number;
    
        @IsNotEmpty()
        @IsPositive()
        @IsInt()
    id_user: number;
        
        @IsOptional()
        @IsNotEmpty()
        @IsPositive()
        @IsInt()
    total_cost: number;
        
        @IsOptional()
        @ArrayNotEmpty()
    products: any;
        
        @IsOptional()
        @Length(3,20)
    status: string;
        
   
   
}
