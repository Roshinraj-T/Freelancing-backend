import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {}

export class ApplyJobDto{
    @ApiProperty()
    jobId : number
 
    @ApiProperty()
    freelancerId : number

    @ApiProperty()
    isApplied ?: boolean ;
    
}

