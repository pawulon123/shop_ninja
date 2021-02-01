import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { UserDto } from './user-dto';
import { UserEntity } from './user.entity';
import *  as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

export type User = {
    userId: number;
    username:string;
    password: string;
}
@Injectable()
export class UserService {
    private users: User[];
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,

    ){
        this.users = [];
    }
    async findOne(mail: string) /*: Promise<User | undefined>*/ { Logger.log(mail)
        const a = this.userRepository.findOneOrFail(mail)
        // Logger.log(a)
        return a;
        // return this.users.find(user => user.username === username)
    }
    async create(userData: any): Promise<any> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        userData.password = hashedPassword;
        return this.userRepository.save(userData);
        // const userId: any = Date.now();
        // this.users.push({
        //     userId: userId,
        //     username: userData.username,
        //     password: hashedPassword
        // });
        // return true

    }
}
