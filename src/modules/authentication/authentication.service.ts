import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface UsuarioPayload {
    sub: string;
}

@Injectable()
export class AuthenticationService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async executeLogin(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        const authenticateUser = await bcrypt.compare(password, user.password);
        if (!authenticateUser) {
            throw new UnauthorizedException('Incorrect email/password');
        }

        const payload: UsuarioPayload = {
            sub: user.id,
        };

        return {
            token: await this.jwtService.signAsync(payload),
        };
    }
}
