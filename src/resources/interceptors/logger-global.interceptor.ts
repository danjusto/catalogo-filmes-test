import {
    CallHandler,
    ConsoleLogger,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { ReqWithUser } from 'src/modules/authentication/authentication.guard';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
    constructor(private logger: ConsoleLogger) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const httpContext = context.switchToHttp();
        const req = httpContext.getRequest<Request | ReqWithUser>();
        const res = httpContext.getResponse<Response>();

        const { path, method } = req;
        const { statusCode } = res;

        this.logger.log(`${method} ${path}`);

        const instantPreController = Date.now();

        return next.handle().pipe(
            tap(() => {
                if ('user' in req) {
                    this.logger.log(`Route access by user ${req.user.sub}`);
                }
                const durationOfExecRoute = Date.now() - instantPreController;
                this.logger.log(
                    `Response: status ${statusCode} - ${durationOfExecRoute}ms`,
                );
            }),
        );
    }
}
