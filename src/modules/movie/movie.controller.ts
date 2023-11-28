import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('/movies')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Post()
    async create(@Body() createMovieDto: CreateMovieDto) {
        return await this.movieService.executeCreate(createMovieDto);
    }

    @Get()
    @UseInterceptors(CacheInterceptor)
    async findAll() {
        return await this.movieService.executeFindAll();
    }

    @Get('/:id')
    @UseInterceptors(CacheInterceptor)
    async findOne(@Param('id') id: string) {
        return await this.movieService.executeFindOne(id);
    }

    @Put('/:id')
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
