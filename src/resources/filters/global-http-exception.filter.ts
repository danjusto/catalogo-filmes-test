import {
    ArgumentsHost,
    Catch,
    ConsoleLogger,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
    constructor(private nativeLogger: ConsoleLogger) {}

    catch(exception: unknown, host: ArgumentsHost) {
        this.nativeLogger.error(exception);
        const context = host.switchToHttp();
        const req = context.getRequest<Request>();
        const res = context.getResponse<Response>();
        const { status, body } =
            exception instanceof HttpException
                ? {
                      status: exception.getStatus(),
                      body: exception.getResponse(),
                  }
                : {
                      status: HttpStatus.INTERNAL_SERVER_ERROR,
                      body: {
                          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                          timestamp: new Date().toISOString(),
                          path: req.url,
                      },
                  };

        res.status(status).json(body);
    }
}
