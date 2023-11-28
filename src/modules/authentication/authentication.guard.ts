import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsuarioPayload } from './authentication.service';

export interface ReqWithUser extends Request {
    user: UsuarioPayload;
}

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<ReqWithUser>();
        const token = this.extractToken(req);
        if (!token) {
            throw new UnauthorizedException('Authentication error');
        }

        try {
            const payload: UsuarioPayload =
                await this.jwtService.verifyAsync(token);
            req.user = payload;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid JWT');
        }
    }

    private extractToken(req: Request): string | undefined {
        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
