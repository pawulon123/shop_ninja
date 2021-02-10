import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { OrderDto } from './order-dto';
import { ProductDto } from '../product/product-dto';
import { Query as Quiries } from '../shared/query';
import { MailService } from '../mailer/mailer.service';
const { countProductsCost } = require('./products.cost')
@Injectable()
export class OrderService {
    products: ProductDto[];
    maxPurchase:number = 4294967295;/*?*/
    constructor(
        private readonly query: Quiries,
        private readonly mailService: MailService,
    ) {
       
    }
    getAll(): Promise<OrderDto[]> {
        return this.query.getOrders();
    }
    async addOne(order: OrderDto): Promise<number> {
        await this.purchasedProducts(order);
        await this.totalCost(order);
        const orderSaved = await this.query.addOrder(order)
        this.sendClientMessage(order);
        return orderSaved.id
    }
    async purchasedProducts(order: OrderDto): Promise<any> {
        this.products = await this.query.getProducts(order);
    }
    async sendClientMessage(order: OrderDto): Promise<any> {
        const user = await this.query.user(order.id_user)
        this.mailService.sendClientConfirmation(order, this.products, user);
    }
    async totalCost(order: OrderDto): Promise<any> {
        const ProductsCost = countProductsCost(order.products, this.products)
        if (ProductsCost >= this.maxPurchase) {
            throw new HttpException('The order is too big. Contact the shop owner ', HttpStatus.BAD_REQUEST);
        } else {
            order.total_cost  =  ProductsCost;
        }
       
    }

    async statistic(): Promise<any> {
        return this.query.getOrders();
    }
}
