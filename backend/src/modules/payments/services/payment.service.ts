import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentRepository } from '../repositories/payment.repository';
import { PaymentStatus } from '../../../common/enums/paymentStatus.enums';
import * as dotenv from 'dotenv';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bull';
dotenv.config();

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private paymentRepository: PaymentRepository,
    @InjectQueue('ordersQueue') private ordersQueue: Queue,
  ) {
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
        amount: Math.round(Number(totalPrice))
      });

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'], // ✅ Now correctly typed
        line_items: cartItems.map(item => ({
          price_data: {
            currency: 'inr', // Or your preferred currency
            product_data: {
              name: item.product.name, // Make sure cartItems have a 'name'
            },
            unit_amount: Math.round(Number(item.product.price) * 100), // Convert to cents
          },
          quantity: Number(item.quantity),
        })),
        mode: 'payment',
        success_url: `http://localhost:5173/`,
        cancel_url: `http://localhost:5173/cancel`,
        metadata: {
          paymentId: payment.paymentId,
          customerId: customerId,
          cartItems: JSON.stringify(cartItems.map(item => ({
            cartItemsId: item.cartItemsId,
            productId: item.product.productId,
            quantity: item.quantity,
            price: item.product.price,
          }))),
          totalAmount: JSON.stringify(totalPrice)
        },
      });

      await this.paymentRepository.updatePayment(payment.paymentId, {
        transactionId: session.id,
      });
      console.log("Sending Response: ",session.id, session.url);
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
  
    if (session.metadata) {
      await this.paymentRepository.updatePayment(session.metadata.paymentId, {
        status: PaymentStatus.COMPLETED,
        transactionId: session.payment_intent?.toString() || session.id,
      });
  
      const { paymentId, customerId, cartItems, totalAmount } = session.metadata;
  
      try {
        await this.ordersQueue.add('processOrder', {
          paymentId,
          customerId,
          cartItems,
          totalAmount,
        });
        console.log('📦Order is sent to the Queue...');
      } catch (error) {
        console.error('❌ Failed to add job to queue:', error);
      }
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