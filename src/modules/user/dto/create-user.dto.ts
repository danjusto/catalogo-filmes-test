import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UniqueEmail } from '../validation/unique-email.validator';

export class CreateUserDto {
    @IsString({ message: 'The property "fullName" must be a string' })
    @IsNotEmpty({ message: 'The property "fullName" cannot be empty' })
    fullName: string;
    @IsEmail(undefined, { message: 'Invalid email' })
    @UniqueEmail({ message: 'This email already exists' })
    email: string;
    @IsString({ message: 'The property "password" must be a string' })
    @MinLength(6, {
        message: 'The property "password" must have at least 6 characters',
    })
    password: string;
}
