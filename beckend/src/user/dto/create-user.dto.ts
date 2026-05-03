export class CreateUserDto {
    "name": string;
    "email": string;
    "passowrd": string;
    "role": "ADMIN" | "PLAYER";
}