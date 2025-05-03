import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { OrderService } from '../services/orders.service';
import { CreateCartItemDto } from 'src/modules/cart/dtos/createCartItem.dto';

@Processor('ordersQueue')
export class OrderProcessor {
  
  constructor(
        private readonly orderService: OrderService
  ) {}

  @Process('processOrder') // Job Name
  async processOrder(job: Job<{ paymentId: string, customerId: string, cartItems: Partial<CreateCartItemDto>, totalAmount: string}>) {
    try{
        const { paymentId, customerId, cartItems, totalAmount } = job.data;
        console.log('Order is received from thee queue: ', paymentId, customerId, cartItems);
    }catch(error){
        console.error('Error in order processing: ', error.message);
    }
  }
}