import { BadRequestException, Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Genre } from '../enum/genre.enum';

@Injectable()
@ValidatorConstraint({ async: true })
export class GenreValidator implements ValidatorConstraintInterface {
    validate(value: any): boolean {
        for (const genre in Genre) {
            if (Genre[genre] === value) {
                return true;
            }
        }
        throw new BadRequestException(
            'The property "genre" must be one of "action, adventure, animation, comedy, drama, fiction, horror, romance, suspense"',
        );
    }
}

export const GenreExists = (validationOptions: ValidationOptions) => {
    return (object: object, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator: GenreValidator,
        });
    };
};
