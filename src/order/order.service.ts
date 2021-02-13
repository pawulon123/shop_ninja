import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { OrderDto } from './order-dto';
import { ProductDto } from '../product/product-dto';
import { Query as Quiries } from '../shared/query';
import { MailService } from '../mailer/mailer.service';
import { TotalCost } from './totalcost';

@Injectable()
export class OrderService {
    constructor(
        private readonly query: Quiries,
        private readonly mailService: MailService,
        private readonly totalCost: TotalCost
    ) {}
    getAll(): Promise<OrderDto[]> {
        return this.query.getOrders();
    }
    async addOne(order: OrderDto): Promise<number> {
        const orderWithCosts: OrderDto = await this.totalCost.productsAndRessult(order, 'total_cost', 'discount');
        const orderSaved: OrderDto = await this.query.addOrder(orderWithCosts);
        this.mailService.sendClientConfirmation(orderSaved);
        return orderSaved.id;
    }
}
