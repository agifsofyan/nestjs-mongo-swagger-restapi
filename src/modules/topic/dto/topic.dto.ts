import {
    IsNotEmpty,
    IsString
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTopicDTO {
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

export type UpdateTopicDTO = Partial<CreateTopicDTO>;
