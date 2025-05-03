import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt_auth.guard";
import { OrderService } from "../services/orders.service";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/enums/roles.enums";

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController{
    constructor(private readonly orderService: OrderService) {}

    @Get('admin')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    async getAllOrders(){
        return this.orderService.getAllOrders();
    }

    @Get('customer')
    @UseGuards(RolesGuard)
    @Roles(UserRole.CUSTOMER)
    async getOrders(@Req() req: Request){
        return this.orderService.getOrder(req['user'].userId);
    }
}