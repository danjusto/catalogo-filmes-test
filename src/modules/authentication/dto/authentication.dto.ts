import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthenticationDto {
    @IsEmail(undefined, { message: 'Invalid email' })
    email: string;

    @IsNotEmpty({ message: 'The property "password" cannot be empty' })
    password: string;
}
