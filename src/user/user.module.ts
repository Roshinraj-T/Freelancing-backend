import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User,Jobs, JobApply, Role, Location, ExperienceLevel, DurationOption, JobType, JobStatus, Profession } from "../user/entities/user.entity";
import { WebSocketGateway } from 'src/web-socket/web-socket.gateway';
import { WebSocketService } from 'src/web-socket/web-socket.service';
@Module({
  imports:[
    TypeOrmModule.forFeature([User,Jobs,JobApply,Role,Location,Profession,ExperienceLevel,DurationOption,JobType,JobStatus]),
    
  ],
  controllers: [UserController],
  providers: [UserService,WebSocketGateway,WebSocketService],
})
export class UserModule {}
