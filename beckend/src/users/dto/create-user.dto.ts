import { IsString, IsNotEmpty, IsEnum, IsEmail } from 'class-validator';

export class CreateUserDto 
{
  // check if the name is string and not empty
  @IsString()
  // check if the name is not empty
  @IsNotEmpty()
  "name": string;

  // check if the email is valid email format
  @IsEmail()
  "email": string;

  // check if the role is either PLAYER or ADMIN
  @IsEnum(['PLAYER', 'ADMIN'], {
    message: 'Role must be either PLAYER or ADMIN',
  })
  "role": "PLAYER" | "ADMIN";
}
