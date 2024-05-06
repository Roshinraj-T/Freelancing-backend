import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApplyJobDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { IMaster } from 'src/core/interface';
import { Response } from 'express';
import { WebSocketGateway } from 'src/web-socket/web-socket.gateway';
@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly webSocketGateway : WebSocketGateway
    ) {}


  @Get('getDurationOption')
  async getDurationOption(
    @Res() response : Response,
    @Req() request : Request
  ) {
    try{
      let data: IMaster[] = await this.userService.getDurationOption();
      response.status(HttpStatus.OK).json(data)
    }catch {
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Unable to get Duration Option',
      });
    }
  }
  @Get('getProfessionData')
  async getProfessionData(@Res() response: Response) {
    const data: IMaster[] = await this.userService.getProfessionData();
    response.status(HttpStatus.OK).json(data);
  }
  @Get('getJobType')
  async getJobType(@Res() response: Response) {
    const data: IMaster[] = await this.userService.getJobType();
    response.status(HttpStatus.OK).json(data);
  }
  @Get('getExperienceLevelData')
  async getExperienceLevelData(
    @Res() response : Response,
    @Req() request : Request
  ) {
    try{
      let data: IMaster[] = await this.userService.getExperienceLevelData();
      response.status(HttpStatus.OK).json(data)
    }catch {
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Unable to get Duration Option',
      });
    }
  }
  @Get('getLocationData')
  async getLocationData(
    @Res() response : Response,
    @Req() request : Request
  ) {
    try{
      let data: IMaster[] = await this.userService.getLocationData();
      response.status(HttpStatus.OK).json(data)
    }catch {
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Unable to get Duration Option',
      });
    }
  }
  @Post('postAJob')
  async postAJob(
    @Res() response : Response,
    @Req() request : Request,
    @Body() data : any
  ){
    try{
      await this.userService.postAJob(data);
      await this.webSocketGateway.completedResult(data);
      response.status(HttpStatus.OK).json({
        message : 'Job Posted Successfully'
      })
    } catch(err) {
      console.log(err);
      
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Unable to Post a job',
      })
    }
  }
  @Get('getClientJobs/:id')
  async getClientJobs(
    @Res() response : Response,
    @Req() request : Request,
    @Param('id') id : number
  ) {
    try{
      console.log(id);
      
      let data = await this.userService.getClientJobs(id);
      response.status(HttpStatus.OK).json({
        data,
        message : 'Jobs retrieved',
        success : true
      })
    }catch(err) {
      console.log(err);
      
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Unable to get Jobs',
      });
    }
  }

  @Get('getAllJobs')
  async getAllJobs(
    @Res() response : Response,
    @Req() request : Request,
    @Query() data : any
  ) {
    try{
      let jobData = await this.userService.getAllJobs(data.userId);
      response.status(HttpStatus.OK).json({
        data : jobData,
        message : 'Jobs retrieved',
        success : true
      })
    }catch(err) {
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Unable to get Jobs',
      });
    }
  }

  @Post('applyJob')
  async applyJob(
    @Res() response : Response,
    @Req() request : Request,
    @Body() data : ApplyJobDto
  ){
    try{
      console.log(data);
      
        let jobData =  await this.userService.applyJob(data)
        response.status(HttpStatus.OK).json({
          message : 'Job Applied Successfully',
          data : jobData,
          success : true
        })
    }catch(err) {
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Unable to get Jobs',
      });
    }
  }
  @Get('getNotification')
  async getNotification(
    @Res() response : Response,
    @Req() request : Request,
    @Query() data : any
  ) {
    try{
      let jobData = await this.userService.getNotification(data.userId);
      response.status(HttpStatus.OK).json({
        data : jobData,
        message : 'Job retrieved',
        success : true
      })
    }catch(err) {
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Unable to get Job',
      });
    }
  }
  @Get('getFreelancerWork/:id')
  async getFreelancerWork(
    @Res() response : Response,
    @Req() request : Request,
    @Param('id') id : number
  ) {
    try{
      let jobData = await this.userService.getFreelancerWork(id);
      response.status(HttpStatus.OK).json({
        data : jobData,
        message : 'Jobs retrieved',
        success : true
      })
    }catch(err) {
      console.log(err);
      
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Unable to get Jobs',
      });
    }
  }
  
  @Get('getApplicantDetails/:id')
  async getApplicantDetails(
    @Res() response : Response,
    @Req() request : Request,
    @Param('id') id : number
  ) {
    try{
      let jobData = await this.userService.getApplicantDetails(id);
      response.status(HttpStatus.OK).json({
        data : jobData,
        message : 'Jobs retrieved',
        success : true
      })
    }catch(err) {
      console.log(err);
      
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Unable to get Jobs',
      });
    }
  }
  @Post('acceptApplication')
  async acceptApplication(
    @Res() response : Response,
    @Req() request : Request,
    @Body() data : ApplyJobDto
  ){
    try{
      console.log(data);
      
        let jobData =  await this.userService.acceptApplication(data)
        response.status(HttpStatus.OK).json({
          message : 'Job Applied Successfully',
          data : jobData,
          success : true
        })
    }catch(err) {
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Unable to get Jobs',
      });
    }
  }
}
