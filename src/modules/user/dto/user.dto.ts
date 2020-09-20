import {
    IsNotEmpty,
    MinLength,
    IsString,
    MaxLength,
    IsEmail,
    IsEnum
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum RolesEnum { 
	SALES = 'SALES', 
	ADMIN = 'ADMIN', 
	CONTENT = 'CONTENT', 
	FINANCE = 'FINANCE', 
	MENTOR = 'MENTOR',
	IT = 'IT', 
	SUPERADMIN = 'SUPERADMIN',
}

export class CreateUserDTO {
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
    password: string;

    // Role
    @ApiProperty({
        example: ['5f62ad8f15e250bb46a7d301', '5f62ad8315e250bb46a7d300'],
        description: 'Role Id',
        format: 'array string'
    })
    role: [string];
}

export type UpdateUserDTO = Partial<CreateUserDTO>;