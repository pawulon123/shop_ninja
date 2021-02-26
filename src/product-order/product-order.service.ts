import { Injectable } from '@nestjs/common';
import { Query as Quiries } from '../shared/query';
@Injectable()
export class ProductOrderService {
constructor(
    private readonly query: Quiries,
){}

}
