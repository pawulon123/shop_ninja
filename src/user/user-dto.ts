import { IsEmail, IsNotEmpty, IsInt, IsOptional, IsPositive, Length, MaxLength } from 'class-validator';
export class UserDto {

        @IsOptional()
        @IsNotEmpty()
        @IsPositive()
        @IsInt()
    id: number;
        
        @IsNotEmpty()
        @IsPositive()
        @IsInt()
    id_role: number;
        
        @IsNotEmpty()
        @IsEmail()
        @MaxLength(254)    
    mail: string;
    
        @IsNotEmpty()
        @Length(6, 60)
    password: string;
        
        @MaxLength(100)
    adress: string;
}
