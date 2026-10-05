import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { DriverProfile } from 'src/drivers/driver-profile.entity';
import { MechanicProfile } from 'src/mechanics/mechanic-profile.entity';
import { User } from 'src/users/user.entity';
import { ServiceCenter } from 'src/service-centers/service-center.entity';

import { JwtStrategy } from './jwt-strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

// auth.module.ts
@Module({
  imports: [
    TypeOrmModule.forFeature([User, DriverProfile, MechanicProfile, ServiceCenter]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (c: ConfigService) => ({ secret: c.getOrThrow<string>('JWT_SECRET'), signOptions: { expiresIn: '1d' } }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}