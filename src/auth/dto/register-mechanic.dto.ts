import { IsArray, ArrayNotEmpty, IsInt, Min, IsNumber, IsLatitude, IsLongitude, IsOptional, IsUUID } from 'class-validator';
import { RegisterBaseDto } from './register-base.dto';

export class RegisterMechanicDto extends RegisterBaseDto {
  @IsArray() @ArrayNotEmpty() specializations!: string[];
  @IsInt() @Min(0) yearsOfExperience!: number;
  @IsNumber() baseServiceCharge!: number;
  @IsLatitude() latitude!: number;
  @IsLongitude() longitude!: number;
  @IsOptional() @IsUUID() serviceCenterId?: string;
}