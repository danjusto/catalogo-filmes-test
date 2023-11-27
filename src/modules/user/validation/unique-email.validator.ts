import { Injectable, NotFoundException } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    async validate(value: any): Promise<boolean> {
        try {
            const userExists = await this.userService.findByEmail(value);
            return !userExists;
        } catch (error) {
            if (error instanceof NotFoundException) {
                return true;
            }
            throw error;
        }
    }
}

export const UniqueEmail = (validationOptions: ValidationOptions) => {
    return (object: object, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator: UniqueEmailValidator,
        });
    };
};
