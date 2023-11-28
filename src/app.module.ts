import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MovieModule } from './modules/movie/movie.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { APP_FILTER } from '@nestjs/core';
import { GlobalHttpExceptionFilter } from './filters/global-http-exception.filter';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

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
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalHttpExceptionFilter,
        },
    ],
})
export class AppModule {}
