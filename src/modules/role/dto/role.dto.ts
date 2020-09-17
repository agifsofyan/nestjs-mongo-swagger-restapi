import {
    IsNotEmpty,
    IsString,
    IsEnum
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum AdminType { 
	SALES = 'SALES', 
	ADMIN = 'ADMIN',
	CONTENT = 'CONTENT', 
	FINANCE = 'FINANCE', 
	MENTOR = 'MENTOR',
	IT = 'IT', 
	SUPERADMIN = 'SUPERADMIN',
}

export class CreateRoleDTO {
    // Admin Type
    @IsNotEmpty()
    @IsString()
    @IsEnum(AdminType, { message: 'Type value is: SALES | ADMIN | CONTENT | FINANCE | MENTOR | IT | SUPERADMIN' })
    @ApiProperty({
        example: 'supervisor',
        description: 'Admin Type',
        format: 'string',
        enum: ['SALES', 'ADMIN', 'CONTENT', 'FINANCE', 'MENTOR', 'IT', 'SUPERADMIN']
    })
    adminType: AdminType;

    @ApiProperty({
        example: false,
        description: 'Read Write',
        format: 'boolean'
    })
    readWrite: boolean;
}

export type UpdateRoleDTO = Partial<CreateRoleDTO>;
