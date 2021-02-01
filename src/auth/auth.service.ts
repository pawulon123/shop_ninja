import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import *  as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}
    async validateUser(mail:string, pass: string): Promise<any> {
        const user = await this.userService.findOne(mail);
        if (user && await bcrypt.compare(pass, user.password)) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }
    async login(user: any) { 
        const payload = { mail: user.mail, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    async register(userData: any): Promise<any> {
        return await this.userService.create(userData)
    }  
}
