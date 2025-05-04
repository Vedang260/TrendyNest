import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt_auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/roles.enums';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get(':paymentId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.CUSTOMER)
  async getPaymentDetails(@Param('paymentId') paymentId: string){
    return await this.paymentService.getPaymentDetails(paymentId);
  }

  @Post('checkout')
  @UseGuards(RolesGuard)
  @Roles(UserRole.CUSTOMER)
  async handleCreateCheckoutSession(@Req() req: Request, @Body() body :{ cartItems: any, totalPrice: number}) {
    try {
      const { cartItems, totalPrice } = body;
      return await this.paymentService.createCheckoutSession(req['user'].userId, cartItems, totalPrice);
    }catch (err) {
      console.error("Error in creating the checkout session");  
    }
  }
}