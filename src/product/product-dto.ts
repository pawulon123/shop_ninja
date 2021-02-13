import { IsEmail, IsNotEmpty, IsInt, IsOptional, IsPositive, Length, MaxLength, IsUrl } from 'class-validator';

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
    
    @IsOptional()
    @IsNotEmpty()
    @MaxLength(255)
    @IsUrl()
images_url: string;
    
    @IsNotEmpty()
    @IsPositive()
    @IsInt()
price: number;
    
    @IsOptional()
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
