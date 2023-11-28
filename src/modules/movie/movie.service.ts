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
        return await this.movieRepository.save(newMovie);
    }

    async executeFindAll() {
        return `This action returns all movie`;
    }

    async executeFindOne(id: string) {
        return `This action returns a #${id} movie`;
    }

    async executeUpdate(id: string, updateMovieDto: UpdateMovieDto) {
        const movie = await this.movieRepository.findOneBy({ id });
        if (movie === null) {
            throw new NotFoundException('Movie not found');
        }
        Object.assign(movie, updateMovieDto as Movie);
        return await this.movieRepository.save(movie);
    }

    async executeRemove(id: string) {
        return `This action removes a #${id} movie`;
    }
}
