import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body, Post } from '@nestjs/common';
import { RegisterDriverDto } from './dto/register-driver.dto';
import { RegisterMechanicDto } from './dto/register-mechanic.dto';
import { RegisterCenterDto } from './dto/register-service-center.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register/driver')         registerDriver(@Body() dto: RegisterDriverDto) { return this.auth.registerDriver(dto); }
  @Post('register/mechanic')       registerMechanic(@Body() dto: RegisterMechanicDto) { return this.auth.registerMechanic(dto); }
  @Post('register/service-center') registerCenter(@Body() dto: RegisterCenterDto) { return this.auth.registerServiceCenter(dto); }
  @Post('login')                   login(@Body() dto: LoginDto) { return this.auth.login(dto); }
}