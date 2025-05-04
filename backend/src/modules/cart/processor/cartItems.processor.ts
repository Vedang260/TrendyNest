import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { CartItemsService } from '../services/cartItems.service';

@Processor('cartItemsQueue')
export class CartItemsProcessor {
  
  constructor(
    private readonly cartItemsService: CartItemsService
  ) {}

  @Process('processCartItems') // Job Name
  async processCartItems(job: Job<{ customerId: string}>) {
    try{
      const { customerId } = job.data;
      console.log('CustomerId is received from the queue: ', customerId);
      
      await this.cartItemsService.clearCartItems(customerId);
      
    }catch(error){
        console.error('Error in cart Items processing: ', error.message);
    }
  }
}