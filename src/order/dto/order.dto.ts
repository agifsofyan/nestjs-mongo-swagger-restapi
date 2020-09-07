import {
    IsNotEmpty,
    MinLength,
    IsNumber,
    IsString,
    IsEnum,
    Min
} from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export enum EnumType {
    Wa = 'wa',
    Web = 'web',
}

export enum EnumPayment {
    Paid = 'paid',
    Unpaid = 'unpaid',
}

export class OrderDto {
   // ID
   @ApiHideProperty()
   readonly _id: number;

   // Order Date
    @Type(() => Date)
    @IsDate()
    @ApiProperty({
        example: '2019-31-08',
        description: 'Order Date',
        format: 'date'
    })
    readonly order_date: Date;

    // Type
    @IsEnum(EnumType)
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
    readonly qty: number;
    
    // Number
    @IsNotEmpty()
    @IsNumber()
    @Min(3)
    @ApiProperty({
        example: '1500000',
        description: 'Total Price',
        format: 'number'
    })
    readonly total_price: number;
    
    // Payment Status
    @IsEnum(EnumPayment)
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
        example: '2020-08-05',
        description: 'Paid At',
        format: 'date'
    })
    readonly paid_at: Date;
    
    // Due Date
    @Type(() => Date)
    @IsDate()
    @ApiProperty({
        example: '2020-08-05',
        description: 'Due Date',
        format: 'date'
    })
    readonly due_date: Date;
    
    // Customer Id
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'sadccdlacdpcamlvd',
        description: 'Customer Id',
        format: 'string'
    })
    readonly customer_id: string;
    
    // Agent Id
    @IsString()
    @ApiProperty({
        example: 'sadccdsegfghvd',
        description: 'Agent Id',
        format: 'string'
    })
    readonly agent_id: string;
}
