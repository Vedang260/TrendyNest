import { Controller, Post, Req, Res } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';

@Controller('webhooks')
export class WebhookController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('stripe')
  async handleStripeWebhook(@Req() req, @Res() res) {
    try {
      return await this.paymentService.handleWebhookEvent(req.rawBody, req.headers['stripe-signature']);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
}