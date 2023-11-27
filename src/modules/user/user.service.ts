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
        const newUser = new User();
        Object.assign(newUser, createUserDto as User);
        return await this.userRepository.save(newUser);
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findOneBy({ id });
        if (user === null) {
            throw new NotFoundException('User not found');
        }
        Object.assign(user, updateUserDto as User);
        return await this.userRepository.save(user);
    }

    async remove(id: string) {
        return `This action removes a #${id} user`;
    }

    async findByEmail(email: string) {
        const userByEmail = await this.userRepository.findOneBy({ email });
        if (userByEmail === null) {
            throw new NotFoundException('User not found');
        }
        return userByEmail;
    }
}
