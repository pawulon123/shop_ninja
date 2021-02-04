
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { Query } from '../shared/query';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([OrderEntity]),
    AuthModule
  ],
  providers: [
    OrderService,
    Query
  ],
  controllers: [OrderController]
})
export class OrderModule {}
