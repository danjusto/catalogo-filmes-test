import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Movie } from './movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreValidator } from './validation/genre.validator';

@Module({
    imports: [TypeOrmModule.forFeature([Movie])],
    controllers: [MovieController],
    providers: [MovieService, GenreValidator],
})
export class MovieModule {}
