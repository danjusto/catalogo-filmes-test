import {
    Controller,
    Post,
    Body,
    Delete,
    Put,
    HttpCode,
    UseGuards,
    Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashPasswordPipe } from '../../resources/pipes/hash-password.pipe';
import {
    AuthenticationGuard,
    ReqWithUser,
} from '../authentication/authentication.guard';

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(
        @Body() createUserDto: CreateUserDto,
        @Body('password', HashPasswordPipe) hashedPassword: string,
    ) {
        const newUser = await this.userService.executeCreate({
            ...createUserDto,
            password: hashedPassword,
        });
        return newUser;
    }

    @Put()
    @UseGuards(AuthenticationGuard)
    async update(
        @Req() req: ReqWithUser,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const userId = req.user.sub;
        return await this.userService.executeUpdate(userId, updateUserDto);
    }

    @Delete()
    @UseGuards(AuthenticationGuard)
    @HttpCode(204)
    async remove(@Req() req: ReqWithUser) {
        const userId = req.user.sub;
        await this.userService.executeRemove(userId);
    }
}
