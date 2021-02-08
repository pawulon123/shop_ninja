import { HttpException, HttpStatus } from '@nestjs/common';
import { OrderDto } from './order-dto';
export function countProductsCost(productsReq:OrderDto[], products): number {
    return productsReq.reduce((number, product) => {
        const amount:number = 'amount' in product ? product['amount'] : 1;
        if (!Number.isInteger(amount)) throw new HttpException('Bad insert data', HttpStatus.BAD_REQUEST);
        products.forEach(prod => {
            if (prod.id === product.id) number =+ (amount * prod.price) + number
        });
        return number;
    }, 0);
}