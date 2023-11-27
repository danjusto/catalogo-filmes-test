import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MovieModule } from './modules/movie/movie.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';

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
    ],
    providers: [],
})
export class AppModule {}
