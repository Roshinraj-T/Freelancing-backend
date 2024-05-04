import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User,Jobs, JobApply, Role, Location, ExperienceLevel, DurationOption, JobType, JobStatus, Profession } from "../user/entities/user.entity";
@Module({
  imports:[
    TypeOrmModule.forFeature([User,Jobs,JobApply,Role,Location,Profession,ExperienceLevel,DurationOption,JobType,JobStatus]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
