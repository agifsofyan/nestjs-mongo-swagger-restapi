import {
    IsNotEmpty,
    MinLength,
    IsString,
    IsEnum,
    IsDate,
} from 'class-validator';
// import { Type } from 'class-transformer';
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
    Draft  = 'draft',
}

export enum SaleMethodEnum { 
	Normal = 'normal', 
	Upsale = 'upsale',
	Upgrade = 'upgrade',
	Crossale = 'crossale',
}

export class CreateProductDTO {
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
        example: 'Bisnis Market Pasar Modal 2020',
        description: 'Name',
        format: 'form'
    })
    name: string;

    // Slug
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
	example: 'Bisnis Market 2020',
	description: 'Slug',
	format: 'string'
    })
    slug: string;

    // Visibility
    @IsEnum(VisibilityEnum, { message: 'Type value is: publish, private, draft' })
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'publish',
        description: 'Visibility',
        enum: ['publish', 'private'],
        default: 'publish'
    })
    visibility: VisibilityEnum;

    // Headline
    // @IsString()
    // @MinLength(5)
    @ApiProperty({
        example: 'Bisnis Market to young generation',
        description: 'Headline',
        format: 'string'
    })
    headline: string;

    // Description
    @IsString()
    @MinLength(5)
    @ApiProperty({
        example: 'Bisnis Market to young generation in the world',
	description: 'Full Description',
        format: 'string'
    })
    description: string;

    // Feedback (what you learn)
    // @IsString()
    // @MinLength(5)
    @ApiProperty({
        example: 'Why You Learn our',
	description: 'Feedback (why your learn)',
        format: 'string'
    })
    feedback: string;

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
    @ApiProperty({
        example: [
            "5f603a33ea0a1626403abe95",
            "5f603a39ea0a1626403abe96"
        ],
        description: 'Select From Field Topic',
        format: 'array'
    })
    topic: [string]; // Topic from category table (collection)

    // Image URL
    // @IsString()
    @ApiProperty({
         example: "http://sample/image.jpg",
         description: 'Image Url',
         format: 'string'
    })
    image_url: string;

    // Video URL
    // @IsString()
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

    // Webinar Date
    //@IsDate()
    //@Type(() => Date)
    @ApiProperty({  
    	example: "2020-10-25",
        description: 'Webinar Date',                     
        format: 'date',                 
	type: 'string'                                    
    })                                     
    date: string;

    // Start Time
    //@IsString()
    @ApiProperty({
        example: "05:00",
        description: 'Start Time',
        format: 'string'
    })
    start_time: string;

    // End Time
    //@IsString()
    @ApiProperty({
        example: "21:32",
        description: 'End At',
        format: 'string'
    })
    end_time: string;

     // Client Url
    // @IsString()
     @ApiProperty({
         example: "https://zoom.us/j/2697925165?_x_zm_rtaid=58knpEjNRpOiZWECLYlkcA.1599641870607.036d146a5990bf44527a2edee2775bae&_x_zm_rhtaid=36#success",
         description: 'Media Url',
         format: 'string'
     })
    client_url: string;

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
    // @IsString()
    @ApiProperty({
        example: "Ebook WLEM",
        description: 'Product Redirect',
        format: 'string'
    })
    product_redirect: string;

    // ReSeller
    //  @IsString()
     @ApiProperty({
         example: "Aminah",
         description: 'Reseller name',
         format: 'string'
    })
    reseller: string;
    
    // Image Bonus URL
    @ApiProperty({
         example: ["http://sample/image-bonus1.jpg", "http://sample/image-bonus2.jpg"],
         description: 'Image bonus Url',
         format: 'array'
    })
    image_bonus_url: [string];

    // Image Text Url
    @ApiProperty({
         example:["http://sample/image-text1.jpg", "http://sample/image-text2.jpg"],
         description: 'Image Text Url',
         format: 'array'
    })
    image_text_url: [string];

    // Image Product URL
    @ApiProperty({
         example: ["http://sample/image-product1.jpg", "http://sample/image-product2.jpg"],
         description: 'Image Product Url',
         format: 'array'
    })
    image_product_url: [string];

    // Section
    // @IsString()
    @ApiProperty({
        example: 'Section in the paragraf of young generation in the world',
	description: 'section',
        format: 'string'
    })
    section: string;
}

export type UpdateProductDTO = Partial<CreateProductDTO>;
