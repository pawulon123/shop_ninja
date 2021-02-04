import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import *  as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/user-dto';

@Injectable()
export class AuthService {
    role:string
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}
    async validateUser(mail:string, pass: string): Promise<any> {
        const user: UserDto = await this.userService.findOne(mail);
        this.role = user['role']['name']
        if (user && await bcrypt.compare(pass, user.password)) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }
    async login(user: any) { 
        const payload = { mail: user.mail, role: this.role };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    async register(userData: any): Promise<any> {
        return await this.userService.create(userData)
    }  
}
