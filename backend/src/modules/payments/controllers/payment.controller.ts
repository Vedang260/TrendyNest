import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CartItems } from 'src/modules/cart/entities/cartItems.entity';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout')
  async handleCreateCheckoutSession(@Req() req: Request, @Res() res, @Body() body :{ cartItems: any, totalPrice: number}) {
    try {
        const { cartItems, totalPrice } = body;
      return await this.paymentService.createCheckoutSession(req['user'].userId, cartItems, totalPrice);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
}