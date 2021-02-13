import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Query } from './../shared/query';

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductEntity]),

  ],
  exports:[ProductService],
  controllers: [ProductController],
  providers: [
    ProductService,
    Query]
})
export class ProductModule {}
