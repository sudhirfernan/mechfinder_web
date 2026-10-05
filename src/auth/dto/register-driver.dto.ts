import { IsOptional } from 'class-validator';
import { RegisterBaseDto } from './register-base.dto';

export class RegisterDriverDto extends RegisterBaseDto {
  @IsOptional() vehicleMake?: string;
  @IsOptional() vehicleModel?: string;
  @IsOptional() plateNumber?: string;
}