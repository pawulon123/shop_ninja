
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { TotalCost } from './totalcost';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { Query } from '../shared/query';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mailer/mailer.module';
import { ProductModule } from '../product/product.module';


@Module({
  imports:[
    TypeOrmModule.forFeature([OrderEntity]),
    AuthModule,
    MailModule,
    ProductModule
  ],
  providers: [
    OrderService,
    Query,
    TotalCost
   ],
  controllers: [OrderController]
})
export class OrderModule {}
