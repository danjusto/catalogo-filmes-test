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
        return (await this.userRepository.save(newUser)).toListDto();
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findOneBy({ id });
        if (user === null) {
            throw new NotFoundException('User not found');
        }
        Object.assign(user, updateUserDto as User);
        return (await this.userRepository.save(user)).toListDto();
    }

    async remove(id: string) {
        const result = await this.userRepository.delete(id);
        if (!result.affected) {
            throw new NotFoundException('User not found');
        }
    }

    async findByEmail(email: string) {
        const userByEmail = await this.userRepository.findOneBy({ email });
        if (userByEmail === null) {
            throw new NotFoundException('User not found');
        }
        return userByEmail;
    }
}
