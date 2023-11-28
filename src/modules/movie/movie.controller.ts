import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('/movies')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Post()
    async create(@Body() createMovieDto: CreateMovieDto) {
        return await this.movieService.executeCreate(createMovieDto);
    }

    @Get()
    async findAll() {
        return await this.movieService.executeFindAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id: string) {
        return await this.movieService.executeFindOne(id);
    }

    @Patch('/:id')
    async update(
        @Param('id') id: string,
        @Body() updateMovieDto: UpdateMovieDto,
    ) {
        return await this.movieService.executeUpdate(id, updateMovieDto);
    }

    @Delete('/:id')
    async remove(@Param('id') id: string) {
        return await this.movieService.executeRemove(id);
    }
}
