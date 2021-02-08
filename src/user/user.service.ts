import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { UserDto } from './user-dto';
import { UserEntity } from './user.entity';
import *  as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ){
    }
     findOne(mail: string): Promise<UserDto> {
        return this.userRepository.findOneOrFail({mail}, { relations: ["role"] });
     }
    async create(userData: UserDto): Promise<UserDto> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        userData.password = hashedPassword;
        return this.userRepository.save(userData);
    }
}
