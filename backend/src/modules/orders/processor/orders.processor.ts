import { Processor, Process, InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { OrderService } from '../services/orders.service';
import { CreateOrderDto } from '../dtos/createOrder.dto';
import { OrderItemsService } from '../services/orderItems.service';

@Processor('ordersQueue')
export class OrderProcessor {
  
  constructor(
    private readonly orderService: OrderService,
    private readonly orderItemsService: OrderItemsService,
    @InjectQueue('cartItemsQueue') 
    private cartItemsQueue: Queue,
  ) {}

  @Process('processOrder') // Job Name
  async processOrder(job: Job<{ paymentId: string, customerId: string, cartItems: any, totalAmount: string}>) {
    try{
      const { paymentId, customerId, cartItems, totalAmount } = job.data;
      console.log('Order is received from thee queue: ', paymentId, customerId, cartItems);
      
      let newCartItems;
      if (typeof cartItems === 'string') {
        newCartItems = JSON.parse(cartItems);
      }
  
      if (!Array.isArray(newCartItems)) {
        throw new Error('cartItems is not an array after parsing');
      }

      const createOrderDto: CreateOrderDto ={
        paymentId,
        customerId,
        totalAmount: Number(totalAmount)
      }
      // placing an order
      const response = await this.orderService.placeOrder(createOrderDto);
      if(response.success){
        console.log("Order is created...");
        // if order will be placed then adding orderItems
        const order = await response.order;
        const orderItems = newCartItems.map((item) => ({
          orderId: order.orderId,
          productId: item.productId,
          quantity:Number(item.quantity),
          price: Number(item.price)
        }));

        await this.orderItemsService.addOrderItems(orderItems);
        console.log("Order Items are also added...");

        await this.cartItemsQueue.add('processCartItems', { customerId });
        console.log("Cart Items are sent into the queue...")
      }
    }catch(error){
        console.error('Error in order processing: ', error.message);
    }
  }
}