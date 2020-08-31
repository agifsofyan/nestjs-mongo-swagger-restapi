import {
    IsNotEmpty,
    MinLength,
    IsNumber,
    IsString,
    Min,
    Max
} from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UsersDto {
   // ID
   @ApiHideProperty()
   readonly _id: number;

   // Username
    @ApiProperty({
        example: 'Dinda',
        description: 'Username',
        format: 'string'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
	readonly username: string;

    // Email
    @ApiProperty({
        example: 'admin@email.com',
        description: 'Email',
        format: 'string'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    readonly email: string;

    // No Hp
    @ApiProperty({
        example: '08989900272',
        description: 'No Hp',
        format: 'number'
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(9)
    @Max(13)
    readonly nohp: string;

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

    // Roles
    @ApiProperty({
        example: 'admin',
        description: 'Roles',
        format: 'string'
    })
    @IsString()
    readonly roles: string;

    // Created At
    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    readonly created_at: Date;
}
