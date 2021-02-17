import { ProductService } from './../product/product.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { OrderDto } from './order-dto';

@Injectable()
export class TotalCost {
    maxPurchase: number = 4294967295;/*?*/
    state = {
        total_cost: 0,
        productsCost: 0,
        discount: 0 
    }
    constructor(
        private readonly productService: ProductService
    ) { }
    async productsAndRessult(order: OrderDto, ...keys: string[]):Promise<OrderDto> | null {
        await this.caller(this.productService.countProductsCost.bind(this.productService, order.products), 'productCost');
        // await this.caller(this.productService.countProductsCost.bind(this.productService, order.products), 'productCost');
        return keys.length ? this.assignResult(order, keys) : null
    }
    async setDiscount(): Promise<void> {
        await this.caller(discount => 0, 'discount');
    }
    private assignResult(obj: OrderDto, keys: string[]): OrderDto {
        return keys.reduce((obj, key) => {
            obj[key] = this.state[key];
            return obj
        }, obj);
    }
    private async caller(methodService, keyState: string, assignResultToObj: OrderDto|null = null): Promise<void> {
        this.state[keyState] = await methodService();
        this.count();
    }
    private count():void {
        const { productsCost, discount } = this.state;
        this.state.total_cost = productsCost - discount;
        if (this.state.total_cost >= this.maxPurchase) {
            throw new HttpException('The order is too big. Contact the shop owner ', HttpStatus.BAD_REQUEST);
        }
    }
    get currentState() {
        return this.state;
    }
}