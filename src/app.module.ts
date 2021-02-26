import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import configDb from './config.db';
import { ConfigModule } from '@nestjs/config';
import { HttpExceptionFilter } from './http-exception.filter';
import { Module } from '@nestjs/common';
import { MailModule } from './mailer/mailer.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { ProductOrderModule } from './product-order/product-order.module';
import { RoleModule } from './role/role.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { StatisticsModule } from './statistics/statistics.module';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configDb()),
    CategoryModule,
    OrderModule,
    ProductModule,
    RoleModule,
    UserModule,
    AuthModule,
    SharedModule,
    MailModule,
    ProductOrderModule,
    StatisticsModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}