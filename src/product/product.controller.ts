import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product-dto';

@Controller('product')
export class ProductController {
    constructor(public readonly productService: ProductService) {}
}
