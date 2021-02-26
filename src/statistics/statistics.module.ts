import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { BestSellingProduct } from './statistics/best-selling-products.ts';
import { Query } from '../shared/query';
@Module({
  imports: [
  ],
  providers: [
    StatisticsService,
    BestSellingProduct,
    Query
  ]
})
export class StatisticsModule {}
