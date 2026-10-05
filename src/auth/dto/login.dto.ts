import { IsEmail, MinLength, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail() email!: string;
  @MinLength(8) password!: string;
  @IsString() @IsNotEmpty() role!: string;
}