import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MovieModule } from './modules/movie/movie.module';

@Module({
  imports: [UserModule, MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
