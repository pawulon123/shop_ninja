import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService) {
        super();
        Logger.log('aaaaaaaaaaaaaaaaaaaaaaa')
      }
    async validate(mail: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(mail, password);
    if (!user) {
        throw new UnauthorizedException();
    }
    return user;
    }  
} 