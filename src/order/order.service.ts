import { Injectable } from '@nestjs/common';
import { OrderDto } from './order-dto';
import { Query as Quiries } from '../shared/query';

@Injectable()
export class OrderService {
    constructor(
        private readonly query: Quiries,
       ){}
    getAll(): Promise<OrderDto[]> {
        return this.query.getOrders();
    }
    addOne(body): Promise<number> {
        return this.query.addOne(body);
    }
}
