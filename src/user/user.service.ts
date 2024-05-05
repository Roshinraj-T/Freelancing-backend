import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DurationOption, ExperienceLevel, JobStatus, JobType, Jobs, Location, Profession, User } from './entities/user.entity';
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

    @InjectRepository(Jobs) // Injecting the repository for the User entity
    private readonly jobsRepository: Repository<Jobs>,

    @InjectRepository(JobType) // Injecting the repository for the User entity
    private readonly jobTypeRepository: Repository<JobType>,
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
  async postAJob(data){
    await this.jobsRepository.save(data)
  }
  async getJobType() {
    return await this.jobTypeRepository
      .createQueryBuilder('u')
      .select('u.id, u.name')
      .orderBy('u.name', 'ASC')
      .getRawMany();
  }
  async getMyJobs(id : number){
    return await this.jobsRepository
      .createQueryBuilder('job')
      .leftJoin(Profession,'p','p.id = job.professionId')
      .leftJoin(DurationOption,'d','d.id = job.durationOptionId')
      .leftJoin(ExperienceLevel,'e','e.id = job.experienceLevelId')
      .leftJoin(JobType,'jt','jt.id = job.jobTypeId')
      .leftJoin(JobStatus,'js','js.id = job.jobStatusId')      
      .select(`job.id,job.description,job.address,
      js.name as jobStatusName,jt.name as jobTypeName,
      e.name as experienceLevelName,d.name as durationName,
      p.name as professionName`)
      .where('clientId = :id',{id})
      .getRawMany()
  }
}
