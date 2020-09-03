import {
    IsNotEmpty,
    MinLength,
    IsNumber,
    IsString,
    Min
} from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderDto {
   // ID
   @ApiHideProperty()
   readonly _id: number;

   // Order Date
    @ApiProperty({
        example: '2019-10-08',
        description: 'Order Date',
        format: 'date'
    })
    @Type(() => Date)
    @IsDate()
    readonly order_date: Date;

    // Type
    @ApiProperty({
        example: 'wa',
        description: 'Type',
        format: 'string'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    readonly type: string;

    // Qty
    @ApiProperty({
        example: '3',
        description: 'Quantity',
        format: 'number'
    })
    @IsNotEmpty()
    @IsNumber()
    readonly qty: number;
    
    // Number
    @ApiProperty({
        example: '1500000',
        description: 'Total Price',
        format: 'number'
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(3)
    readonly total_price: number;
    
    // Payment Status
    @ApiProperty({
        example: 'paid',
        description: 'Payment Status',
        format: 'string'
    })
    @IsNotEmpty()
    @IsString()
    readonly payment_status: string;
    
    // Paid At
    @ApiProperty({
        example: '2020-08-05',
        description: 'Paid At',
        format: 'date'
    })
    @Type(() => Date)
    @IsDate()
    readonly paid_at: Date;
    
    // Due Date
    @ApiProperty({
        example: '2020-08-05',
        description: 'Due Date',
        format: 'date'
    })
    @Type(() => Date)
    @IsDate()
    readonly due_date: Date;
    
    // Customer Id
    @ApiProperty({
        example: 'sadccdlacdpcamlvd',
        description: 'Customer Id',
        format: 'string'
    })
    @IsNotEmpty()
    @IsString()
    readonly customer_id: string;
    
    // Agent Id
    @ApiProperty({
        example: 'sadccdsegfghvd',
        description: 'Agent Id',
        format: 'string'
    })
    readonly agent_id: string;
}
