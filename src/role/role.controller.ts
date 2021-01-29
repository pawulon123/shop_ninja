import { Controller } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './role-dto';

@Controller('role')
export class RoleController {
    constructor(public readonly roleService: RoleService) {}
}
