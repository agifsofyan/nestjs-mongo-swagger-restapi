import {
    IsNotEmpty,
    MinLength,
    IsString,
    IsEnum,
    IsDate
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum EnumType { 
	Webinar = 'webinar', 
	Digital = 'digital', 
	Ecommerce = 'ecommerce', 
	Bonus = 'bonus', 
}

export enum VisibilityEnum { 
	Publish = 'publish', 
	Private = 'private',
}

export enum SaleMethodEnum { 
	Normal = 'normal', 
	Upsale = 'upsale',
	Upgrade = 'upgrade',
	Crossale = 'crossale',
}

export enum FormEnum { 
	Simple = 'simple', 
	Full = 'full',
}

export class ProductDto {
    // Type
    @IsEnum(EnumType, { message: 'Type value is: webinar, digital, ecommerce, bonus' })
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'webinar',
        description: 'Type',
        enum: ['webinar', 'digital', 'ecommerce', 'bonus'] 
    })
    type: EnumType;

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

    // Visibility
    @IsEnum(VisibilityEnum, { message: 'Type value is: publish, private' })
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'publish',
        description: 'Visibility',
        enum: ['publish', 'private'],
        default: 'publish'
    })
    visibility: VisibilityEnum;
    
    // Form Type
    @IsEnum(FormEnum, { message: 'Type value is: simple, full' })
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'simple',
        description: 'Form Type',
        enum: ['simple', 'full'],
        default: 'simple'
    })
    form_type: FormEnum;

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
    @IsString()
    @MinLength(4)
    @ApiProperty({
        example: "150000",
        description: 'Price',
        format: 'string'
    })
    price: string;

    // Topic
    @IsNotEmpty()
    // @IsString()
    @ApiProperty({
        example: [
            {
              "_id": "5f573ce648d45f4578599b75"
            },
            {
              "_id": "5f573d0548d45f4578599b76"
            }
        ],
        description: 'Topic',
        // format: 'string'
    })
    topic: string;

     // Image URL
     @IsString()
     @ApiProperty({
         example: "http://sample/image.jpg",
         description: 'Image Url',
         format: 'string'
     })
    image_url: string;

    // Video URL
    @IsString()
    @ApiProperty({
        example: "http://sample/video.mp4",
        description: 'Video Url',
        format: 'string'
    })
   video_url: string;

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

    // Start At
    @Type(() => Date)
    @IsDate()
    @ApiProperty({
        example: "2018-06-22T08:00:19Z",
        description: 'Start At',
        format: 'date-time',
        type: 'string'
    })
    start_at: Date;

    // End At
    @Type(() => Date)
    @IsDate()
    @ApiProperty({
        example: "2018-06-22T08:00:19Z",
        description: 'End At',
        format: 'date-time',
        type: 'string'
    })
    end_at: Date;

     // Location
     @IsString()
     @ApiProperty({
         example: "Gading Serpong",
         description: 'Location',
         format: 'string'
     })
    location: string;

    // Sale Method / Upsale
    @IsEnum(SaleMethodEnum, { message: 'Type value is: normal, upsale, upgrade, crossale' })
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'normal',
        description: 'Upsale',
        enum: ['normal', 'upsale', 'upgrade', 'crossale'],
        default: 'normal'
    })
    sale_method: SaleMethodEnum;

    // Product Redirect
    @IsString()
    @ApiProperty({
        example: "Ebook WLEM",
        description: 'Product Redirect',
        format: 'string'
    })
    product_redirect: string;

    // Seller
    // @IsString()
    // @ApiProperty({
    //     example: "",
    //     description: 'Product Redirect',
    //     format: 'string'
    // })
    // seller: string;
}
