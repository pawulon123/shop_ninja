import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './order-dto';

@Controller('order')
export class OrderController {
    constructor(public readonly orderService: OrderService) {}
}
