import {
    Controller,
    Post,
    Body,
    Param,
    Delete,
    Put,
    HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.executeCreate(createUserDto);
    }

    @Put('/:id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return await this.userService.executeUpdate(id, updateUserDto);
    }

    @Delete('/:id')
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        await this.userService.executeRemove(id);
    }
}
