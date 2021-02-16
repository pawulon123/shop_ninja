import { IsNotEmpty, IsInt, IsOptional, IsPositive} from 'class-validator';

export class OrderReqDto {
       
        @IsNotEmpty()
        @IsPositive()
        @IsInt()
    id: number;
    
        @IsOptional()
        @IsNotEmpty()
        @IsPositive()
        @IsInt()
    amount?: string
   
  }