import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const userEntity = new User();
        Object.assign(userEntity, createUserDto as User);
        return await this.userRepository.save(userEntity);
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    async remove(id: string) {
        return `This action removes a #${id} user`;
    }

    async findByEmail(email: string) {
        const userByEmail = await this.userRepository.findOne({
            where: { email },
        });
        if (userByEmail === null) {
            throw new NotFoundException('Email not found');
        }
        return userByEmail;
    }
}
