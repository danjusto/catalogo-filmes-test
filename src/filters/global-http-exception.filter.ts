import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
    constructor(private adapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const { httpAdapter } = this.adapterHost;

        const context = host.switchToHttp();
        const req = context.getResponse();
        const res = context.getRequest();

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
                          path: httpAdapter.getRequestUrl(req),
                      },
                  };

        httpAdapter.reply(res, body, status);
    }
}
