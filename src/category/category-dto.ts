import { IsEmail, IsNotEmpty, IsInt, IsOptional, IsPositive, Length, MaxLength } from 'class-validator';

export class CategoryDto {
    @IsOptional()
    @IsNotEmpty()
    @IsPositive()
    @IsInt()
id: number;
    
    @IsNotEmpty()
    @Length(3, 30)
name: string;
}
