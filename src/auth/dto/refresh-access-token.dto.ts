import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshAccessTokenDTO {
    @ApiProperty({
        description: 'Access token',
        format: 'uuid',
        uniqueItems: true,
    })
    @IsNotEmpty()
    @IsUUID()
    readonly refreshToken: string;
}