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
import { ApiTags, ApiOperation, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('orders')
@UseGuards(RolesGuard)
@Controller('orders')
export class OrderController {
    
    constructor(private readonly orderService: OrderService){}
    
    /**
     * @route   POST /api/v1/orders
     * @desc    Create a new order
     * @access  Public
     */
    @Post()
    @UseGuards(AuthGuard('jwt'))
    @Roles('Administrator')
    @ApiOperation({ summary: 'Create new order' })
    @ApiHeader({
        name: 'x-auth-token',
        description: 'token.'
    })
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
    @UseGuards(AuthGuard('jwt'))
    @Roles('Administrator')
    @ApiHeader({
        name: 'x-auth-token',
        description: 'token.'
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
    @UseGuards(AuthGuard('jwt'))
    @Roles('Administrator')
    @ApiHeader({
        name: 'x-auth-token',
        description: 'token.'
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
    @UseGuards(AuthGuard('jwt'))
    @Roles('Administrator')
    @ApiHeader({
        name: 'x-auth-token',
        description: 'token.'
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
    @UseGuards(AuthGuard('jwt'))
    @Roles('Administrator')
    @ApiHeader({
        name: 'x-auth-token',
        description: 'token.'
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
    @UseGuards(AuthGuard('jwt'))
    @Roles('Administrator')
    @ApiHeader({
        name: 'x-auth-token',
        description: 'token.'
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
