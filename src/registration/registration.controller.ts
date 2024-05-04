import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto, SignUpDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from "express";
@Controller('registration')
@ApiTags('Registration')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
    ) {}
  @Post('login')
  async login(@Body() loginData: CreateRegistrationDto, @Res() response: Response) {
    const user = await this.registrationService.validateUser(
      loginData.email
    );
    if (!user) {
      response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Invalid credentials',
      });
      return;
    }
    response.status(HttpStatus.OK).json({message : 'login successfully'}); // Return the JWT token
  }
  @Post('signUp')
  async signUp(@Body() loginData: SignUpDto, @Res() response: Response) {
    const user = await this.registrationService.validateUser(
      loginData.email
    );
    if(user){
      response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Email Already Exist',
      });
      return;
    } else{
      await this.registrationService.createAccount(loginData)
    }
  }
}
