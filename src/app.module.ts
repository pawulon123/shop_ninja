import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import  configDb  from './config.db';
import { ConfigModule } from '@nestjs/config';
import { HttpExceptionFilter } from './http-exception.filter';
import { Module } from '@nestjs/common';
import { MailModule } from './mailer/mailer.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { RoleModule } from './role/role.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';



@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot(configDb()),
    CategoryModule,
    OrderModule,
    ProductModule,
    RoleModule,
    UserModule,
    AuthModule,
    SharedModule,
    MailModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}