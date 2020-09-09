import {
    IsNotEmpty,
    MinLength,
    IsString,
    IsNumber,
    IsEnum,
    IsDate,
    Min
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum EnumType {
    Wa = 'wa',
    Web = 'web',
}

export enum EnumPayment {
    Paid = 'paid',
    Unpaid = 'unpaid',
}

export class OrderDto {
   // Order Date
    @Type(() => Date)
    @IsDate()
    @ApiProperty({
        example: "2018-06-22T08:00:19Z",
        description: 'Order Date',
        format: 'date-time',
        type: 'string'
    })
    order_date: Date;

    // Type
    @IsEnum(EnumType, { message: 'Type value is: wa, web' })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @ApiProperty({
        example: 'wa',
        description: 'Type',
        format: 'string'
    })
    type: EnumType;

    // Qty
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: '3',
        description: 'Quantity',
        format: 'number'
    })
    qty: number;
    
    // Number
    @IsNotEmpty()
    @IsNumber()
    @Min(3)
    @ApiProperty({
        example: '1500000',
        description: 'Total Price',
        format: 'number'
    })
    total_price: number;
    
    // Payment Status
    @IsEnum(EnumPayment, { message: 'Payment value is: paid, unpaid' })
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'paid',
        description: 'Payment Status',
        format: 'string'
    })
    payment_status: EnumPayment;
    
    // Paid At
    @Type(() => Date)
    @IsDate()
    @ApiProperty({
        example: "2018-06-22T08:00:19Z",
        description: 'Paid At',
        format: 'date-time',
        type: 'string'
    })
    paid_at: Date;
    
    // Due Date
    @Type(() => Date)
    @IsDate()
    @ApiProperty({
        example: "2018-06-22T08:00:19Z",
        description: 'Due Date',
        format: 'date-time',
        type: 'string'
    })
    due_date: Date;
    
    // Customer Id
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'sadccdlacdpcamlvd',
        description: 'Customer Id',
        format: 'string'
    })
    customer_id: string;
    
    // Agent Id
    @IsString()
    @ApiProperty({
        example: 'sadccdsegfghvd',
        description: 'Agent Id',
        format: 'string'
    })
    agent_id: string;
}
