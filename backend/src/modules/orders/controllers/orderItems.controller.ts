import { Body, Controller, Get, Param, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt_auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/enums/roles.enums";
import { OrderItemsService } from "../services/orderItems.service";
import { OrderItemStatus } from "src/common/enums/orderItemStatus.enums";

@Controller('order-items')
@UseGuards(JwtAuthGuard)
export class OrderItemsController{
    constructor(private readonly orderItemsService: OrderItemsService) {}

    @Get(':orderId')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.CUSTOMER)
    async getAllOrderItems(@Param('orderId') orderId: string){
        return this.orderItemsService.fetchOrderItems(orderId);
    }

    @Put(':orderItemsId')
    @UseGuards(RolesGuard)
    @Roles(UserRole.VENDOR)
    async getOrders(@Param('orderItemsId') orderItemsId: string, @Body() body: { status: OrderItemStatus }){
        const { status } = body;
        return this.orderItemsService.updateOrderItemsStatus(orderItemsId, status);
    }
}