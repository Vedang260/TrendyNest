import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../entities/orders.entity';
import { BullModule } from '@nestjs/bull';
import { OrdersRepository } from '../repositories/orders.repository';
import { OrderService } from '../services/orders.service';
import { OrderController } from '../controllers/orders.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders]),
    BullModule.registerQueue({
        name: 'ordersQueue',
    }),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrdersRepository
  ],
  exports: [OrderService, OrdersRepository],
})
export class OrdersModule {} 