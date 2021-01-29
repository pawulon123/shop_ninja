import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './category-dto';

@Controller('category')
export class CategoryController {
    constructor(public readonly categoryService: CategoryService) {}
}
