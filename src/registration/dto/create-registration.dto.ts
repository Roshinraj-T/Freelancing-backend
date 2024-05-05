import { ApiProperty } from "@nestjs/swagger";

export class CreateRegistrationDto {
    @ApiProperty()
    email : string;

    @ApiProperty()
    password : string;
}

export class SignUpDto {
    @ApiProperty()
    name :string;

    @ApiProperty()
    email : string;

    @ApiProperty()
    password : string;

    @ApiProperty()
    phoneNumber : string;

    @ApiProperty()
    rating : number;

    @ApiProperty()
    locationId : number;

    @ApiProperty()
    experienceLevelId : number;

    @ApiProperty()
    roleId : number;

    @ApiProperty()
    professionId : number
}

