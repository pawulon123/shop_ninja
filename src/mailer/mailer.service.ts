import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { OrderDto } from '../order/order-dto';
import { ProductDto } from '../product/product-dto';
import { UserDto } from '../user/user-dto';
@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ) { }
    sendClientConfirmation(order: OrderDto, products: ProductDto[], user: UserDto): void {
        const productsHtml = products.reduce((string, item) => {
            const objAmount = order.products.filter(product => product.id === item.id)[0];
            const piece  = 'amount' in objAmount ? objAmount['amount'] : 1;
            const sum = piece * item.price
            return `<p>${item.name} price: ${item.price} quantity: ${piece} sum: ${sum} </p>` + string;
        }, ``)
        this.mailerService.sendMail({
            to: user.mail,
            from: 'ninja.shop@ol.com',
            subject: `Ninja_shop order nr:${new Date().getFullYear()} / ${order.id}`,
            html: `<h1>Hello ${user.mail}</h1>
                    <p> You have bought products: ${productsHtml} </p>          
                    <p> There is to be paid : ${order.total_cost} </p>          
          `
        })
    }
}
