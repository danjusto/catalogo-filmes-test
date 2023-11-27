import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Genre } from './enum/genre.enum';

@Entity({ name: 'movies' })
export class Movie {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ name: 'title', length: 100, nullable: false })
    title: string;
    @Column({ name: 'genre', length: 50, nullable: false })
    genre: Genre;
    @Column({ name: 'description', length: 255, nullable: false })
    description: string;
    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}
