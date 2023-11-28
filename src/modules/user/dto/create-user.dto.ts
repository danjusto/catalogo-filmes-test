import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { UniqueEmail } from '../validation/unique-email.validator';

export class CreateUserDto {
    @IsString({ message: 'The property "fullName" must be a string' })
    @IsNotEmpty({ message: 'The property "fullName" cannot be empty' })
    fullName: string;
    @IsEmail(undefined, { message: 'Invalid email' })
    @UniqueEmail({ message: 'This email already exists' })
    email: string;
    @IsString({ message: 'The property "password" must be a string' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/, {
        message:
            'The property "password" must have at least one lowercase letter, one uppercase letter, one digit, one special character and contain between 8 and 20 characters',
    })
    password: string;
}
