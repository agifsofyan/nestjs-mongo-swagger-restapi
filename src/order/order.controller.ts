import { 
    Controller, 
    Get, 
    Response, 
    HttpStatus, 
    Param, 
    Body, 
    Post,
    Patch, 
    Delete,
    UseGuards
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
//import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('orders')
//@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
    
    constructor(private readonly orderService: OrderService){}
    
    /**
     * @route   POST /api/v1/orders
     * @desc    Create a new order
     * @access  Public
     */
    @Post()
    @ApiOperation({ summary: 'Create new order' })
    @ApiResponse({ status: 403, description: 'forbidden' })
    async create(@Response() res, @Body() orderDto: OrderDto) {
        const order = await this.orderService.create(orderDto);
        return res.status(HttpStatus.CREATED).json({
            statusCode: HttpStatus.CREATED,
            message: 'The Order has been successfully created.',
            data: order
        });
    }

    /**
     * @route   GET /api/v1/orders
     * @desc    Get all order
     * @access  Public
     */
    @Get()
    @ApiResponse({
            status: HttpStatus.OK,
            description: 'Get all order' 
    })
    async findAll(@Response() res) {
        const order = await this.orderService.findAll();
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: `Success get orders`,
            data: order
        });
    }

    /**
     * @route    GET
         * @desc     Get order by condition (filter)
         * @access   Public
     **/
    @Get('find')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get order by condition(filter)'
    })
    async findOne(@Response() res, @Body() body){
        const filter = body;
        const order = await this.orderService.findOne(filter);
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: `Success get order`,
            data: order
        });
    }

    /**
     * @route    Get /api/v1/orders/:id
     * @desc     Get order by ID
     * @access   Public
     */
    @Get(':id')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get order by ID'
    })
    async findById(@Param('id') id: string, @Response() res)  {
        const order = await this.orderService.findById(id);
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: `Success get order by id ${id}`,
            data: order
        });
    }
    
    /**
     * @route   Patch /api/v1/orders/:id
     * @desc    Update order by Id
     * @access  Public
     **/
    @Patch(':id')
    @ApiResponse({ 
        status: HttpStatus.OK,
        description: 'Update order'
    })
    async update(
        @Param('id') id: string,
        @Response() res,
        @Body() newOrderDto: OrderDto
    ){
        const order = await this.orderService.update(id, newOrderDto);
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: 'The Order has been successfully updated.',
            data: order
        });
    }

    /**
     * @route   Delete /api/v1/orders/:id
     * @desc    Delete order by ID
     * @access  Public
     **/
    @Delete(':id')
    @ApiResponse({ 
        status: HttpStatus.OK,
        description: 'Delete order' 
    })
    async delete(@Param('id') id: string, @Response() res){
        const order = await this.orderService.delete(id);
        
        if (order == 'ok') {
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: `Success remove order by id ${id}`
            });
        }
    }
}
