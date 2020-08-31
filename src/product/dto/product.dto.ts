import {
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsNumber,
    IsString,
    Min
} from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDto {
   // ID
   @ApiHideProperty()
   readonly _id: number;

   // Type
    @ApiProperty({
        example: 'public',
        description: 'Type',
        format: 'string'
    })
    @IsNotEmpty()
    @IsString()
	readonly type: string;

    // Name
    @ApiProperty({
        example: 'Army Jacket',
        description: 'Name',
        format: 'string'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    readonly name: string;

    // Slug
    @ApiProperty({
        example: 'army_jacket',
        description: 'Slug',
        format: 'string'
    })
    readonly slug: string;

    // Short Desc
    @ApiProperty({
        example: 'Jacket style By Army',
        description: 'Short Description',
        format: 'string'
    })
    @IsString()
    @MinLength(5)
    readonly short_desc: string;

    // Description
    @ApiProperty({
        example: 'Cool Jacket from Army, with soldier motif',
        description: 'Full Description',
        format: 'string'
    })
    @IsString()
    @MinLength(5)
    readonly description: string;

    // Time Periode
    @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    readonly time_period: string;

    // Price
    @ApiProperty({
        example: '150000',
        description: 'Price',
        format: 'number'
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(4)
    readonly price: number;

    // Created At
    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    readonly created_at: Date;

    // Created By
    @ApiProperty()
    readonly created_by: string;

    // Updated At
    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    readonly updated_at: Date;

    // Updated By
    @ApiProperty()
    readonly updated_by: string;
}
