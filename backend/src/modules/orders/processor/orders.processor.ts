import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { OrderService } from '../services/orders.service';
import { CreateCartItemDto } from 'src/modules/cart/dtos/createCartItem.dto';
import { CreateOrderDto } from '../dtos/createOrder.dto';
import { OrderItemsService } from '../services/orderItems.service';
import { CreateOrderItemsDto } from '../dtos/createOrderItems.dto';

@Processor('ordersQueue')
export class OrderProcessor {
  
  constructor(
    private readonly orderService: OrderService,
    private readonly orderItemsService: OrderItemsService
  ) {}

  @Process('processOrder') // Job Name
  async processOrder(job: Job<{ paymentId: string, customerId: string, cartItems: any, totalAmount: string}>) {
    try{
      const { paymentId, customerId, cartItems, totalAmount } = job.data;
      console.log('Order is received from thee queue: ', paymentId, customerId, cartItems);
      
      const createOrderDto: CreateOrderDto ={
        paymentId,
        customerId,
        totalAmount: Number(totalAmount)
      }
      // placing an order
      const response = await this.orderService.placeOrder(createOrderDto);
      if(response.success){
        // if order will be placed then adding orderItems
        const order = await response.order;
        const orderItems = cartItems.map((item) => ({
          orderId: order.orderId,
          productId: item.productId,
          quantity:Number(item.quantity),
          price: Number(item.price)
        }));

        await this.orderItemsService.addOrderItems(orderItems);
      }
    }catch(error){
        console.error('Error in order processing: ', error.message);
    }
  }
}