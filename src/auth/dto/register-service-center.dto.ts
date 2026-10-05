import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// auth/dto/register-center.dto.ts
import {
  IsArray, ArrayNotEmpty, IsEmail, IsLatitude, IsLongitude,
  IsNotEmpty, IsOptional, IsString, MinLength,
} from 'class-validator';

export class RegisterCenterDto {
  @IsEmail()
  email!: string;

  @MinLength(8)
  password!: string;

  @IsString() @IsNotEmpty()
  name!: string;                  // business name

  @IsString() @IsNotEmpty()
  phone!: string;

  @IsString() @IsNotEmpty()
  address!: string;

  @IsOptional() @IsString()
  registrationNumber?: string;   // business registration number

  @IsArray() @ArrayNotEmpty() @IsString({ each: true })
  specializations!: string[];     // e.g. ['battery', 'engine', 'tyre']

  @IsLatitude()
  latitude!: number;

  @IsLongitude()
  longitude!: number;
}