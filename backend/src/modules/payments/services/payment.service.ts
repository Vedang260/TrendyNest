import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentRepository } from '../repositories/payment.repository';
import { PaymentStatus } from '../../../common/enums/paymentStatus.enums';
import  dotenv  from 'dotenv';
import { CartItems } from 'src/modules/cart/entities/cartItems.entity';
dotenv.config();

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private paymentRepository: PaymentRepository) {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if(stripeKey){
        this.stripe = new Stripe(stripeKey, {
            apiVersion: '2025-04-30.basil',
        });
    }
  }

  async createCheckoutSession(customerId: string, cartItems:any, totalPrice: number) {
    try {
      // Create payment record first
      const payment = await this.paymentRepository.createNewPayment({
        customerId: customerId,
        amount: totalPrice
      });

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'], // ✅ Now correctly typed
        line_items: cartItems.map(item => ({
          price_data: {
            currency: 'inr', // Or your preferred currency
            product_data: {
              name: item.name, // Make sure cartItems have a 'name'
            },
            unit_amount: item.price, // Convert to cents
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        metadata: {
          paymentId: payment.paymentId,
          customerId: customerId,
        },
      });

      await this.paymentRepository.updatePayment(payment.paymentId, {
        transactionId: session.id,
      });

      return {
        success: true,
        sessionId: session.id,
        url: session.url, 
      };
    } catch (error: any) {
      console.error(`Checkout session error: ${error.message}`);
      return{
        success: false
      }
    }
  }

  async handleWebhookEvent(payload: Buffer, signature: string) {
    const event = this.stripe.webhooks.constructEvent(
      payload,
      signature,
      "whsec_8fc625696bc365c245581807ba4e83288eca6eed4cfe6b96583571b459d12894"
    );

    switch (event.type) {
      case 'checkout.session.completed':
        return this.handleCheckoutSessionCompleted(event.data.object);
      case 'checkout.session.async_payment_succeeded':
        return this.handlePaymentSuccess(event.data.object);
      case 'checkout.session.async_payment_failed':
        return this.handlePaymentFailure(event.data.object);
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }

  private async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    console.log(`Session completed: ${session.id}`);
    // Immediate payment methods (like cards) will be paid here
    if (session.payment_status === 'paid') {
      await this.handlePaymentSuccess(session);
    }
  }

  private async handlePaymentSuccess(session: Stripe.Checkout.Session) {
    console.log(`Payment succeeded: ${session.id}`);
    
    if(session.metadata){
        await this.paymentRepository.updatePayment(session.metadata.paymentId, {
            status: PaymentStatus.COMPLETED,
            transactionId: session.payment_intent?.toString() || session.id,
        });
        // Add your order fulfillment logic here
    }
  }

  private async handlePaymentFailure(session: Stripe.Checkout.Session) {
    console.warn(`Payment failed: ${session.id}`);
    if(session.metadata){
        await this.paymentRepository.updatePayment(session.metadata.paymentId, {
            status: PaymentStatus.FAILED,
        });
    }
  }
}