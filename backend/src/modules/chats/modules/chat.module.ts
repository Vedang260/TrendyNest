import { Module } from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { OrdersModule } from 'src/modules/orders/modules/orders.module';
import { ProductsModule } from 'src/modules/products/module/products.module';
import { ChatGateway } from '../gateways/chat.gateway';
import { OrderItemsModule } from 'src/modules/orders/modules/orderItems.module';

@Module({
  imports: [
    OrdersModule,
    OrderItemsModule,
    ProductsModule
  ],
  providers: [
    ChatService,
    ChatGateway
  ],
  exports: [ChatService]
})
export class ChatModule {} 