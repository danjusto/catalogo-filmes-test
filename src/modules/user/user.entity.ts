import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ListUserDto } from './dto/list-user.dto';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ name: 'full_name', length: 255, nullable: false })
    fullName: string;
    @Column({ name: 'email', length: 100, nullable: false })
    email: string;
    @Column({ name: 'password', length: 255, nullable: false })
    password: string;
    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;

    toListDto() {
        return new ListUserDto(this.id, this.fullName, this.email);
    }
}
