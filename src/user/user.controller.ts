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
    let data: IMaster[] = await this.userService.getDurationOption();
    response.status(HttpStatus.OK).json(data)
  }
  @Get('getProfessionData')
  async getProfessionData(
    @Res() response : Response,
    @Req() request : Request
  ) {
    let data: IMaster[] = await this.userService.getProfessionData();
    response.status(HttpStatus.OK).json(data)
  }
  @Get('getExperienceLevelData')
  async getExperienceLevelData(
    @Res() response : Response,
    @Req() request : Request
  ) {
    let data: IMaster[] = await this.userService.getExperienceLevelData();
    response.status(HttpStatus.OK).json(data)
  }
  @Get('getLocationData')
  async getLocationData(
    @Res() response : Response,
    @Req() request : Request
  ) {
    let data: IMaster[] = await this.userService.getLocationData();
    response.status(HttpStatus.OK).json(data)
  }
}
