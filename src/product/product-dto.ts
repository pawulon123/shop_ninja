import { IsEmail, IsNotEmpty, IsInt, IsOptional, IsPositive, Length, MaxLength } from 'class-validator';

export class ProductDto {

    @IsOptional()
    @IsNotEmpty()
    @IsPositive()
    @IsInt()
id: number;
    
    @IsNotEmpty()
    @IsPositive()
    @IsInt()
category_id: number;
    
    @IsNotEmpty()
    @Length(3, 60)    
name: string;

    @IsNotEmpty()
    @Length(6, 255)
images_url: string;
    
    @IsNotEmpty()
    @IsPositive()
    @IsInt()
price: number;
    
    @MaxLength(500)
description: string;

    @IsOptional()
    @IsPositive()
    @IsInt()
amount?: number;

    @IsOptional()
    @IsPositive()
    @IsInt()
inTotal?: number;
}
