import {
    IsNotEmpty,
    IsEmail,
    IsString
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDTO {
    // Email
    @ApiProperty({
        example: 'johndoe@gmail.com',
        description: 'Email',
        format: 'email'
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    // Password
    @ApiProperty({
        example: 'changeme',
        description: 'Password',
        format: 'string'
    })
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}