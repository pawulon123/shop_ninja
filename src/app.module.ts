import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import  configDb  from './config.db';


@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot(configDb()),
    CategoryModule,
    OrderModule,
    ProductModule,
    RoleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}