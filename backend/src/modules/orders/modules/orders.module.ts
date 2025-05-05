import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../entities/orders.entity';
import { BullModule } from '@nestjs/bull';
import { OrdersRepository } from '../repositories/orders.repository';
import { OrderService } from '../services/orders.service';
import { OrderController } from '../controllers/orders.controller';
import { OrderProcessor } from '../processor/orders.processor';
import { OrderItemsModule } from './orderItems.module';
import { CartItemsModule } from 'src/modules/cart/modules/cartItems.module';
import { EMailModule } from 'src/utils/mails/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders]),
    BullModule.registerQueue({
        name: 'ordersQueue',
    }),
    OrderItemsModule,
    CartItemsModule,
    EMailModule
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrdersRepository,
    OrderProcessor
  ],
  exports: [OrderService, OrdersRepository, BullModule],
})
export class OrdersModule {} 