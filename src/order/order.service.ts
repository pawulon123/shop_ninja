import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { OrderDto } from './order-dto';
import { ProductDto } from '../product/product-dto';
import { Query } from '../shared/query';
import { MailService } from '../mailer/mailer.service';
import { TotalCost } from './totalcost';
import { Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
@Injectable()
export class OrderService {
    constructor(
        private readonly query: Query,
        private readonly mailService: MailService,
        private readonly totalCost: TotalCost
    ) { }

    getAll(): Promise<OrderDto[]> {
        return this.query.getOrders();
    }
    async addOne(order: OrderDto): Promise<number> { 
        const orderWithCosts: OrderDto = await this.totalCost.productsAndRessult(order, 'total_cost');
        
        const orderSaved: OrderDto = await this.query.addOrder(orderWithCosts);
        this.mailService.sendClientConfirmation(orderSaved);
        return orderSaved.id;
    }
    async statistic(): Promise<any> {
        return this.query.getOrders();
    }
}
