import {
    IsNotEmpty,
    IsString
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateFulfillmentDTO {
    // Title
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'This is a sample of Title Fulfillment',
        description: 'Fulfillment',
        format: 'string'
    })
    name: string;

    // Fullfillment or Blog [type]
    @ApiProperty({
        example: false, // false to blog. true to fulfillment
        description: 'Is Fulfillment',
        format: 'boolean'
    })
    isFullfillment: boolean;

    // Cover Images
    // @IsNotEmpty()
    // @IsString()
    @ApiProperty({
        example: 'This is a Cover Image (file)',
        description: 'Cover Image',
        format: 'string'
    })
    cover_img: string;

    // Short Content
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'This is a Short Content of Fulfillment',
        description: 'Short Content',
        format: 'string'
    })
    short_content: string; 

    // Product
    @IsNotEmpty()
    @ApiProperty({
        example: [
            '5f4c5aee1b3800225cccec28', 
            '5f4c7d496176b41b046f7bf7'
        ],
        description: 'Product',
        format: 'string'
    })
    product: [string]; // in array 

    // Topic
    @IsNotEmpty()
    @ApiProperty({
        example: [
            "5f59442b7aebd32d4f1f0167",
            "5f59443c7aebd32d4f1f0168"
        ],
        description: 'Select From Field Topic',
        format: 'array'
    })
    topic: [string]; // in array

    // Content
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'This is a Content Fulfillment. In paragraph',
        description: 'Content',
        format: 'string'
    })
    content: string;

    // Images
    @ApiProperty({
        example: [
            'http://images1.jpg', 
            'http://images2.jpg'
        ],
        description: 'Images',
        format: 'array'
    })
    images: [string]; // in array

    // Video Url
    @ApiProperty({
        example: 'http://video.mkv',
        description: 'Video Url',
        format: 'string'
    })
    video_url: string;

    // Podcast Url
    @ApiProperty({
        example: 'http://podcast-indra-sacdscnkdsc.com/something',
        description: 'Podcash Url',
        format: 'string'
    })
    podcash_url: string;
}

// export type UpdateFulfillmentDTO = Partial<CreateFulfillmentDTO>;
export class UpdateFulfillmentDTO extends PartialType(CreateFulfillmentDTO) { }

export class DeleteManyDTO {
    // Delete multiple ID
    @IsNotEmpty()
    @ApiProperty({
        example: ['5f699e87b92fbe5320a35a93', '5f699e8bb92fbe5320a35a94'],
        description: 'Id',
        format: 'array'
    })
    id: string[];
}

export class SearchDTO {
    // Search
    @IsNotEmpty()
    @ApiProperty({
        example: "Something",
        description: 'Search By Name or Content',
        format: 'string'
    })
    search: string;
}
