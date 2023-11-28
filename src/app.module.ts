import { ConsoleLogger, Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MovieModule } from './modules/movie/movie.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalHttpExceptionFilter } from './resources/filters/global-http-exception.filter';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { LoggerGlobalInterceptor } from './resources/interceptors/logger-global.interceptor';

@Module({
    imports: [
        UserModule,
        MovieModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useClass: PostgresConfigService,
            inject: [PostgresConfigService],
        }),
        CacheModule.registerAsync({
            useFactory: async () => ({
                store: await redisStore({ ttl: 15 * 1000 }),
            }),
            isGlobal: true,
        }),
        AuthenticationModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalHttpExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggerGlobalInterceptor,
        },
        ConsoleLogger,
    ],
})
export class AppModule {}
