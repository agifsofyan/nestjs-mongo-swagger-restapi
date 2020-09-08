import {
    IsNotEmpty,
    IsString
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TopicDto {
    // Name
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'Career',
        description: 'Name',
        format: 'string'
    })
    name: string;
}
