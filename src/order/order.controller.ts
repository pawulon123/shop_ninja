import { Controller, Get, UseGuards, SetMetadata, Body, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './order-dto';
import { RolesGuard } from '../auth/roles.guard';
import { Query } from '../shared/query';
@Controller('order')
@UseGuards(RolesGuard)
export class OrderController { 
    constructor(public readonly orderService: OrderService) {}
   
    @SetMetadata('roles', ['admin'])
    // @Get() getAll(): Promise<OrderDto[]>{ 
    //     return this.orderService.statistic();
    // }
    @Get()
    getAll(): Promise<OrderDto[]>{ 
        return this.orderService.getAll();
    }
    @SetMetadata('roles', ['client', 'admin'])
    @Post()
    create(@Body() body: OrderDto): Promise<number> { 
        return this.orderService.addOne(body);
    }
}
    