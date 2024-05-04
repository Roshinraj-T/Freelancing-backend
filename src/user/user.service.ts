import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DurationOption, User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) // Injecting the repository for the User entity
    private readonly userRepository: Repository<User>,

    @InjectRepository(DurationOption) // Injecting the repository for the User entity
    private readonly durationRepository: Repository<DurationOption>,
  ) {}


  async getDurationOption(){
     return await this.durationRepository
     .createQueryBuilder('u')
     .select('u.id, u.name')
     .getRawMany();
  }
}
