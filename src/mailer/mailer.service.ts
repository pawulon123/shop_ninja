import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { OrderDto } from '../order/order-dto';
import { UserDto } from '../user/user-dto';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly productService: ProductService,
        private readonly userService: UserService
    ) {}
    async sendClientConfirmation(order: OrderDto): Promise<void> {
        const user: UserDto = await this.userService.findOneById(order.id_user)
        const productsHtml: string = this.productService.getLastOrder.reduce((html, item) => {
            return `<p>${item.name} price: ${item.price} quantity: ${item.amount} sum: ${item.inTotal} </p>` + html;
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
