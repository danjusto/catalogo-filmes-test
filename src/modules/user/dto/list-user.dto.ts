export class ListUserDto {
    constructor(
        readonly id: string,
        readonly fullName: string,
        readonly email: string,
    ) {}
}
