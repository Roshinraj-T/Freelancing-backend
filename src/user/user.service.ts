import { Injectable } from '@nestjs/common';
import { ApplyJobDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DurationOption, ExperienceLevel, JobApply, JobStatus, JobType, Jobs, Location, Profession, User } from './entities/user.entity';
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

    @InjectRepository(JobApply) // Injecting the repository for the User entity
    private readonly jobApplyRepository: Repository<JobApply>,
  ) {}


  async getDurationOption() {
    return await this.durationRepository
      .createQueryBuilder('u')
      .select('u.id, u.name')
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
  async postAJob(data : UpdateUserDto){
    await this.jobsRepository.save(data)
  }
  async getJobType() {
    return await this.jobTypeRepository
      .createQueryBuilder('u')
      .select('u.id, u.name')
      .orderBy('u.name', 'ASC')
      .getRawMany();
  }
  async getClientJobs(id : number){
    return await this.jobsRepository
      .createQueryBuilder('job')
      .leftJoin(Profession,'p','p.id = job.professionId')
      .leftJoin(DurationOption,'d','d.id = job.durationOptionId')
      .leftJoin(ExperienceLevel,'e','e.id = job.experienceLevelId')
      .leftJoin(JobType,'jt','jt.id = job.jobTypeId')
      .leftJoin(JobStatus,'js','js.id = job.jobStatusId')  
      .leftJoin(Location,'l','l.id = job.locationId')    
      .select(`job.id,job.description,job.address,
      js.name as jobStatusName,jt.name as jobTypeName,
      e.name as experienceLevelName,d.name as durationName,
      p.name as professionName,l.name as locationName,job.createdAt as date,job.freelancerId as freelancerId`)
      .where('clientId = :id',{id})
      .getRawMany()
  }
  
  async getAllJobs(id:number){
    return await this.jobsRepository
      .createQueryBuilder('job')
      .leftJoin(Profession,'p','p.id = job.professionId')
      .leftJoin(DurationOption,'d','d.id = job.durationOptionId')
      .leftJoin(ExperienceLevel,'e','e.id = job.experienceLevelId')
      .leftJoin(JobType,'jt','jt.id = job.jobTypeId')
      .leftJoin(JobStatus,'js','js.id = job.jobStatusId')  
      .leftJoin(Location,'l','l.id = job.locationId') 
      .leftJoin(JobApply, 'ja', 'ja.jobId = job.id AND ja.freelancerId = :freelancerId', { freelancerId : id })  
      .select(`job.id,job.description,job.address,
      js.name as jobStatusName,jt.name as jobTypeName,
      e.name as experienceLevelName,d.name as durationName,
      p.name as professionName,l.name as locationName,job.createdAt as date,
      CASE WHEN ja.id IS NOT NULL THEN 1 ELSE 0 END AS isApplied`)
      .orderBy('job.createdAt','DESC')
      .getRawMany()
  }
  
  async applyJob(data){
    return await this.jobApplyRepository.save(data)
  }
  async getNotification(userId :number){
    return await this.jobsRepository
    .createQueryBuilder('job')
    .leftJoin(Profession,'p','p.id = job.professionId')
    .leftJoin(DurationOption,'d','d.id = job.durationOptionId')
    .leftJoin(ExperienceLevel,'e','e.id = job.experienceLevelId')
    .leftJoin(JobType,'jt','jt.id = job.jobTypeId')
    .leftJoin(JobStatus,'js','js.id = job.jobStatusId')  
    .leftJoin(Location,'l','l.id = job.locationId')   
    .leftJoin(JobApply, 'ja', 'ja.jobId = job.id AND ja.freelancerId = :freelancerId', { freelancerId : userId }) 
    .select(`job.id,job.description,job.address,
    js.name as jobStatusName,jt.name as jobTypeName,
    e.name as experienceLevelName,d.name as durationName,
    p.name as professionName,l.name as locationName,job.createdAt as date,
    CASE WHEN ja.id IS NOT NULL THEN 1 ELSE 0 END AS isApplied`)
    .orderBy('job.createdAt','DESC')
    .limit(1)
    .getRawOne();
  }
  
  async getFreelancerWork(freelancerId: number) {
    return await this.jobApplyRepository
      .createQueryBuilder('ja') // Alias for JobApply
      .leftJoinAndSelect('ja.jobId', 'job') // Join Jobs with alias 'job'
      .leftJoinAndSelect('job.locationId', 'location') // Join Location
      .leftJoinAndSelect('job.experienceLevelId', 'experience') // Join ExperienceLevel
      .leftJoinAndSelect('job.jobTypeId', 'jobType') // Join JobType
      .leftJoinAndSelect('job.professionId', 'profession') // Join Profession
      .leftJoinAndSelect('job.durationOptionId', 'duration') // Join DurationOption
      .leftJoinAndSelect('job.jobStatusId', 'jobStatus') // Join JobStatus
      .select([
        'job.id as id',
        'job.description as description',
        'job.address as address',
        'jobStatus.name as jobStatusName',
        'jobType.name as jobTypeName',
        'experience.name as experienceLevelName',
        'duration.name as durationName',
        'profession.name as professionName',
        'location.name as locationName',
        'job.createdAt as date',
      ])
      .where('ja.freelancerId = :freelancerId', { freelancerId }) // Use parameterized query
      .orderBy('job.createdAt', 'DESC') // Order by creation date in descending order
      .getRawMany(); // Return raw data with selected fields
  } 
  async getApplicantDetails(jobId: number) {
    return await this.jobApplyRepository
      .createQueryBuilder('ja') // Alias for JobApply
      .leftJoinAndSelect('ja.freelancerId', 'freelancer') // Join with User entity to get freelancer details
      .leftJoinAndSelect('freelancer.locationId', 'location') // Join with Location to get freelancer's location
      .leftJoinAndSelect('freelancer.professionId', 'profession') // Join with Profession
      .leftJoinAndSelect('freelancer.experienceLevelId', 'experience') // Join with ExperienceLevel
      .leftJoinAndSelect('ja.jobId', 'job') // Join with Jobs entity
      .select([
        'ja.id as applicationId', // Application ID
        'freelancer.id as freelancerId',
        'freelancer.name as applicantName', // Freelancer's name
        'location.name as location', // Freelancer's location
        'profession.name as profession', // Freelancer's profession
        'experience.name as experienceLevel',
        'job.id as jobId', // Freelancer's experience level
      ])
      .where('ja.jobId = :jobId', { jobId }) // Parameterized query for security
      .orderBy('ja.createdAt', 'DESC') // Order by application creation date
      .getRawMany(); // Return raw data with selected fields
  }
  
  async acceptApplication(data){
    return await this.jobsRepository.update({
      id : data.jobId
    },{
      freelancerId :data.freelancerId
    }
    )
  }
}
