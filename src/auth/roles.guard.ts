import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt } from 'passport-jwt';
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService
    ) {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const payload: any =  this.jwtService.decode(ExtractJwt.fromAuthHeaderAsBearerToken()(request));
        if (payload) {
            if(!('role' in payload))return;
            const roles = this.reflector.get<string[]>('roles', context.getHandler());
            return roles.includes(payload['role']);
        }
        return;
    }
}