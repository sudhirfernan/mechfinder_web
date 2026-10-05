import { IsEmail, MinLength, IsString, IsNotEmpty } from 'class-validator';

export class RegisterBaseDto {
  @IsEmail() email!: string;
  @MinLength(8) password!: string;
  @IsString() @IsNotEmpty() fullName!: string;
  @IsString() phone!: string;
}