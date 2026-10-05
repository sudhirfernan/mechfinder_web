import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { ServiceCenter } from '../service-centers/service-center.entity';

// mechanics/mechanic-profile.entity.ts  (these fields feed TOPSIS)
@Entity('mechanic_profiles')
export class MechanicProfile {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @OneToOne(() => User, { onDelete: 'CASCADE' }) @JoinColumn() user!: User;
  @ManyToOne(() => ServiceCenter, { nullable: true }) serviceCenter!: ServiceCenter; // optional: freelance or employed
  @Column() fullName!: string;
  @Column() phone!: string;
  @Column('simple-array') specializations!: string[];   // ['battery','engine','tyre']
  @Column({ type: 'int' }) yearsOfExperience!: number;
  @Column({ type: 'decimal', precision: 10, scale: 2 }) baseServiceCharge!: number;
  @Column({ type: 'float', default: 0 }) avgRating!: number;
  @Column({ type: 'int', default: 0 }) ratingCount!: number;
  @Column({ type: 'float' }) latitude!: number;
  @Column({ type: 'float' }) longitude!: number;
  @Column({ default: false }) isVerified!: boolean;     // admin approval
  @Column({ default: true }) isAvailable!: boolean;
}