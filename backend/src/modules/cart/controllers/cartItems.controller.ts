import { Controller, Get, Param, Delete, UseGuards, Post, Put, Body, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt_auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../common/enums/roles.enums';
import { CartItemsService } from '../services/cartItems.service';
import { CreateCartItemDto } from '../dtos/createCartItem.dto';

@Controller('cart-items')
@UseGuards(JwtAuthGuard)
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.CUSTOMER)
  async findAll(@Req() req: Request){
    return this.cartItemsService.getAllCartItems(req['user'].userId);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.CUSTOMER)
  async removeCartItem(@Param('id') id: string){
    return this.cartItemsService.removeCartItem(id);
  }

  @Post('add')
  @UseGuards(RolesGuard)
  @Roles(UserRole.CUSTOMER)
  async addCartItem(@Body('cartItem') createCartItemDto: Partial<CreateCartItemDto>, @Req() req: Request){
    return this.cartItemsService.addCartItem(req['user'].userId, createCartItemDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.CUSTOMER)
  async updateCartItem(@Param('id') id: string, @Body() body : { quantity: number }){
    const { quantity } = body;
    return this.cartItemsService.updateCartItem(id, quantity);
  }
} 