import { ProductOrderEntity } from './product-order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './../shared/shared.module';
import { ProductOrderService } from './product-order.service';
import { Module } from '@nestjs/common';
import { Query } from '../shared/query';
@Module({
    imports: [
        TypeOrmModule.forFeature([ProductOrderEntity]),
        SharedModule
    ],
    providers: [
        ProductOrderService,
        Query,
    ],
    exports: [ProductOrderService]
})
export class ProductOrderModule {}
