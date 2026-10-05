import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
// service-centers/service-center.entity.ts
@Entity('service_centers')
export class ServiceCenter {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @OneToOne(() => User, { onDelete: 'CASCADE' }) @JoinColumn() user!: User;
  @Column() name!: string;
  @Column() phone!: string;
  @Column() address!: string;
  @Column({ nullable: true }) registrationNumber!: string;
  @Column('simple-array') specializations!: string[];
  @Column({ type: 'float' }) latitude!: number;
  @Column({ type: 'float' }) longitude!: number;
  @Column({ default: false }) isVerified!: boolean;
}