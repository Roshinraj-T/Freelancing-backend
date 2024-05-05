import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DurationOption, ExperienceLevel, Location, Profession, User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) // Injecting the repository for the User entity
    private readonly userRepository: Repository<User>,

    @InjectRepository(DurationOption) // Injecting the repository for the User entity
    private readonly durationRepository: Repository<DurationOption>,

    @InjectRepository(Profession) // Injecting the repository for the User entity
    private readonly professionRepository: Repository<Profession>,

    @InjectRepository(ExperienceLevel) // Injecting the repository for the User entity
    private readonly experienceLevelRepository: Repository<ExperienceLevel>,

    @InjectRepository(Location) // Injecting the repository for the User entity
    private readonly locationRepository: Repository<Location>,
  ) {}


  async getDurationOption() {
    return await this.durationRepository
      .createQueryBuilder('u')
      .select('u.id, u.name')
      .orderBy('u.name', 'ASC')
      .getRawMany();
  }
  async getProfessionData() {
    return await this.professionRepository
      .createQueryBuilder('u')
      .select('u.id, u.name')
      .orderBy('u.name', 'ASC')
      .getRawMany();
  }
  async getExperienceLevelData() {
    return await this.experienceLevelRepository
      .createQueryBuilder('u')
      .select('u.id, u.name')
      .getRawMany();
  }
  async getLocationData() {
    return await this.locationRepository
      .createQueryBuilder('u')
      .select('u.id, u.name')
      .orderBy('u.name', 'ASC')
      .getRawMany();
  }
}
