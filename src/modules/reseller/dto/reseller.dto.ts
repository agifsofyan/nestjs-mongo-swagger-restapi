import {
    IsNotEmpty,
    IsString
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResellerDTO {
    // Content
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'Terima kasih sudah minat bergabung menjadi Reseller LARUNOCOM. Sebelum, kita mulai alangkah lebih baik kita pelajari dulu seputar Program Reseller ini. Sehingga, Anda bisa mendapatkan pembelajaran sekaligus keuntungan komersil dari di komunitas LARUNO. Karena, seperti yang kita tahu :',
        description: 'Content',
        format: 'string'
    })
    content: string;

    // Images
    @ApiProperty({
        example: ['https://images.unsplash.com/photo-1556761175-129418cb2dfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80'],
        description: 'Content',
        format: 'array'
    })
    images: [string];
}

export type UpdateResellerDTO = Partial<CreateResellerDTO>;
