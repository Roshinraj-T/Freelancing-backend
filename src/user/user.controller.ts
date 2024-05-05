import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { IMaster } from 'src/core/interface';
import { Response } from 'express';
@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}


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
      await this.userService.postAJob(data)
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
  @Get('getMyJobs/:id')
  async getMyJobs(
    @Res() response : Response,
    @Req() request : Request,
    @Param('id') id : number
  ) {
    try{
      console.log(id);
      
      let data = await this.userService.getMyJobs(id);
      response.status(HttpStatus.OK).json({
        data,
        message : 'get My Jobs retrieved'
      })
    }catch(err) {
      console.log(err);
      
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Unable to get Duration Option',
      });
    }
  }
}
