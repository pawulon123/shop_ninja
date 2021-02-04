import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './order-dto';
import { RolesGuard } from '../auth/roles.guard';

@Controller('order')
@UseGuards(RolesGuard)
export class OrderController {
    
    constructor(public readonly orderService: OrderService) {}
    
    @SetMetadata('roles', ['client'])
    @Get() getAll() :Promise<OrderDto[]>{ 
        return this.orderService.getAll()
    }
}
