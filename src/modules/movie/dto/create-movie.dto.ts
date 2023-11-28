import { IsNotEmpty, IsString } from 'class-validator';
import { Genre } from '../enum/genre.enum';
import { GenreExists } from '../validation/genre.validator';

export class CreateMovieDto {
    @IsString({ message: 'The property "title" must be a string' })
    @IsNotEmpty({ message: 'The property "title" cannot be empty' })
    title: string;
    @IsNotEmpty({ message: 'The property "genre" cannot be empty' })
    @GenreExists({})
    genre: Genre;
    @IsString({ message: 'The property "description" must be a string' })
    @IsNotEmpty({ message: 'The property "description" cannot be empty' })
    description: string;
}
