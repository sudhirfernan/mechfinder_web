import { Injectable } from '@nestjs/common';
import { ConflictException, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, Role } from '../users/user.entity';
import { DriverProfile } from '../drivers/driver-profile.entity';
import { MechanicProfile } from '../mechanics/mechanic-profile.entity';
import { RegisterDriverDto } from './dto/register-driver.dto';
import { RegisterMechanicDto } from './dto/register-mechanic.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterCenterDto } from './dto/register-service-center.dto';
import { ServiceCenter } from 'src/service-centers/service-center.entity';

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User) private users: Repository<User>,
    private jwt: JwtService,
  ) {}

  private async createUser(manager: EntityManager, email: string, password: string, role: Role) {
    const exists = await manager.findOne(User, { where: { email } });
    if (exists) throw new ConflictException('Email already registered');
    const passwordHash = await bcrypt.hash(password, 10);
    return manager.save(manager.create(User, { email, passwordHash, role }));
  }

  async registerDriver(dto: RegisterDriverDto) {
    return this.dataSource.transaction(async (m) => {
      const user = await this.createUser(m, dto.email, dto.password, Role.DRIVER);
      await m.save(m.create(DriverProfile, {
        user, fullName: dto.fullName, phone: dto.phone,
        vehicleMake: dto.vehicleMake, vehicleModel: dto.vehicleModel, plateNumber: dto.plateNumber,
      }));
      return this.signToken(user);
    });
  }

  async registerMechanic(dto: RegisterMechanicDto) {
    return this.dataSource.transaction(async (m) => {
      const user = await this.createUser(m, dto.email, dto.password, Role.MECHANIC);
      await m.save(m.create(MechanicProfile, {
        user,
        fullName: dto.fullName, phone: dto.phone,
        specializations: dto.specializations.map(s => s.toLowerCase()),
        yearsOfExperience: dto.yearsOfExperience,
        baseServiceCharge: dto.baseServiceCharge,
        latitude: dto.latitude, longitude: dto.longitude,
        serviceCenter: dto.serviceCenterId ? { id: dto.serviceCenterId } as any : null,
      }));
      return this.signToken(user);
    });
  }

  async registerServiceCenter(dto: RegisterCenterDto) {
    return this.dataSource.transaction(async (m) => {
      const user = await this.createUser(m, dto.email, dto.password, Role.SERVICE_CENTER);
      await m.save(m.create(ServiceCenter, {
        user,
        name: dto.name,
        phone: dto.phone,
        address: dto.address,
        registrationNumber: dto.registrationNumber,
        specializations: dto.specializations.map(s => s.toLowerCase()),
        latitude: dto.latitude,
        longitude: dto.longitude,
      }));
      return this.signToken(user);
    });
  }

  // registerServiceCenter(...) follows the same pattern

  async login(dto: LoginDto) {
    const user = await this.users.findOne({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash)))
      throw new UnauthorizedException('Invalid credentials');
    if (!user.isActive) throw new ForbiddenException('Account disabled');
    return this.signToken(user);
  }

  private signToken(user: User) {
    const payload = { sub: user.id, role: user.role };
    return { accessToken: this.jwt.sign(payload), role: user.role };
  }
}