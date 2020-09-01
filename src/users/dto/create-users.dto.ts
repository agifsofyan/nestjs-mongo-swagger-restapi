import {
    IsNotEmpty,
    MinLength,
    IsString,
    MaxLength,
    IsEmail
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsersDTO {
    // ID
    // @ApiHideProperty()
    // readonly _id: number;

    // Name
    @ApiProperty({
        example: 'Dinda',
        description: 'Name',
        format: 'string'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
	readonly name: string;

    // Email
    @ApiProperty({
        example: 'admin@email.com',
        description: 'Email',
        format: 'string'
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    // No Hp
    @ApiProperty({
        example: '08989900272',
        description: 'Phone Number',
        format: 'number'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(9)
    @MaxLength(13)
    readonly phone_number: string;

    // Password
    @ApiProperty({
        example: 'Ascd8@129',
        description: 'Password',
        format: 'string'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;
}
