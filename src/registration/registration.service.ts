import { Injectable } from '@nestjs/common';
import { CreateRegistrationDto, SignUpDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ILoginData } from 'src/core/interface';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async validateUser(email: string) {
    return await this.userRepository
      .findOne({ where: { email} })
  }
  
  async createAccount(loginData : any){
    return await this.userRepository.save(loginData)
  }
}
