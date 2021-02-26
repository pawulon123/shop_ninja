import { ProductEntity } from './../../product/product.entity';
import { Injectable } from '@nestjs/common';
import { Query } from '../../shared/query';
import { DateRange } from '../../shared/date.renge';

@Injectable()
export class BestSellingProduct {

    constructor(
        private readonly query: Query,
        ){
    }
    all(){
        console.log('allStatistic(allowedMethods)');
    }
    async lastDay(): Promise<ProductEntity[]>{
      const yesterday = DateRange.lastDays();
      return await this.query.productsHightAmount(yesterday.from, yesterday.to)
    }
    lastMonth() {
      console.log('month');
    }
    currentYear() {
      console.log('year');
    }
}
