import { 
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    create(@Request() req, @Body() dto: CreateOrderDto) {
        return this.ordersService.create(req.user.id, dto);
    }

    @Get()
    findAll(@Request() req) {
        return this.ordersService.findAllByUser(req.user.id);
    }
}
