import { IsNotEmpty, IsInt, IsOptional, IsPositive, ArrayNotEmpty, Length, MaxLength, IsString, ValidateNested, ArrayUnique } from 'class-validator';
import { OrderReqDto } from './order.req-dto';
import { Type } from 'class-transformer';

export    class OrderDto {

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
        @IsPositive()
        @IsInt()
    total_cost: number;
        
        @IsOptional()
        @ArrayNotEmpty()
        @ValidateNested({ each: true })
        @Type(() => OrderReqDto)
        @ArrayUnique(OrderReqDto => OrderReqDto.id)
    products: OrderReqDto[];
        
        @IsOptional()
        @Length(3,20)
    status: string;
    
}
