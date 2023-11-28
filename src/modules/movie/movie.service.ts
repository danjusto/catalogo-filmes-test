import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>,
    ) {}

    async executeCreate(createMovieDto: CreateMovieDto) {
        const newMovie = new Movie();
        Object.assign(newMovie, createMovieDto as Movie);
        return (await this.movieRepository.save(newMovie)).toListDto();
    }

    async executeFindAll() {
        const moviesSaved = await this.movieRepository.find();
        const moviesList = moviesSaved.map((movie) => movie.toListDto());
        return moviesList.sort((a, b) => {
            if (a.title.toUpperCase() < b.title.toUpperCase()) {
                return -1;
            }
            if (a.title.toUpperCase() > b.title.toUpperCase()) {
                return 1;
            }
            return 0;
        });
    }

    async executeFindOne(id: string) {
        const movie = await this.movieRepository.findOneBy({ id });
        if (movie === null) {
            throw new NotFoundException('Movie not found');
        }
        return movie.toListDto();
    }

    async executeUpdate(id: string, updateMovieDto: UpdateMovieDto) {
        const movie = await this.movieRepository.findOneBy({ id });
        if (movie === null) {
            throw new NotFoundException('Movie not found');
        }
        Object.assign(movie, updateMovieDto as Movie);
        return (await this.movieRepository.save(movie)).toListDto();
    }

    async executeRemove(id: string) {
        const result = await this.movieRepository.delete(id);
        if (!result.affected) {
            throw new NotFoundException('Movie not found');
        }
    }
}
