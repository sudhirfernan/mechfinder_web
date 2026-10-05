import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
// drivers/driver-profile.entity.ts
@Entity('driver_profiles')
export class DriverProfile {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @OneToOne(() => User, { onDelete: 'CASCADE' }) @JoinColumn() user!: User;
  @Column() fullName!: string;
  @Column() phone!: string;
  @Column({ nullable: true }) vehicleMake!: string;
  @Column({ nullable: true }) vehicleModel!: string;
  @Column({ nullable: true }) plateNumber!: string;
}