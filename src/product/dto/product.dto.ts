import {
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsNumber,
    IsString,
    Min,
    IsEnum
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum AppState { 
	Webinar = 'webinar', 
	Digital = 'digital', 
	Ecommerce = 'ecommerce', 
	Bonus = 'bonus', 
}

export class ProductDto {
   // Type
    @IsEnum(AppState)
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'webinar',
        description: 'Type',
        enum: ['webinar', 'digital', 'ecommerce', 'bonus'] 
    })
    type: AppState;

    // Name
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @ApiProperty({
        example: 'Bisnis Market',
        description: 'Name',
        format: 'form'
    })
     name: string;

    // Short Desc
    @IsString()
    @MinLength(5)
    @ApiProperty({
        example: 'Bisnis Market to young generation',
        description: 'Short Description',
        format: 'string'
    })
     short_desc: string;

    // Description
    @IsString()
    @MinLength(5)
    @ApiProperty({
        example: 'Bisnis Market to young generation in the world',
        description: 'Full Description',
        format: 'string'
    })
     description: string;

    // Time Periode
    @ApiProperty({
        example: '31',
        description: 'Time Periode',
        format: 'string'
    })
     time_period: string;

    // Price
    @IsNotEmpty()
    @IsNumber()
    @Min(4)
    @ApiProperty({
        example: 150000,
        description: 'Price',
        format: 'number'
    })
     price: number;

    // Created By
    @ApiProperty({
    	example: '1213242edsdas',
	    description: 'Created By',
	    format: 'string'
    })
     created_by: string;

    // Updated By
    @ApiProperty({
    	example: 'fdfrgtgerefref',
	    description: 'Updated By',
	    format: 'string'
    })
     updated_by: string;
}
