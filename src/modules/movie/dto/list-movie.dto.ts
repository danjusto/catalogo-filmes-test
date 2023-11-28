import { Genre } from '../enum/genre.enum';

export class ListMovieDto {
    constructor(
        readonly id: string,
        readonly title: string,
        readonly genre: Genre,
        readonly description: string,
    ) {}
}
