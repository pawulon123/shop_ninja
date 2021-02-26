import { Injectable } from '@nestjs/common';
import { BestSellingProduct} from './statistics/best-selling-products.ts';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class StatisticsService {
    ressult = {};
    constructor(
        private readonly bestSellingProdukt: BestSellingProduct
    ) {}
    private async bestSellingProduct(timeRange: string): Promise<void> {
        this.ressult[timeRange] = await this.bestSellingProdukt[timeRange]();
        console.log(this.ressult);
    }
    @Cron('* * * * * *')
    createRaport() {
        this.bestSellingProduct('lastDay');
    }
}
