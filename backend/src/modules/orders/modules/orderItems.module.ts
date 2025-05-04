import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItems } from '../entities/orderItems.entity';
import { OrderItemsController } from '../controllers/orderItems.controller';
import { OrderItemsService } from '../services/orderItems.service';
import { OrderItemsRepository } from '../repositories/orderItems.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItems]),
  ],
  controllers: [OrderItemsController],
  providers: [
    OrderItemsService,
    OrderItemsRepository
  ],
  exports: [OrderItemsService, OrderItemsRepository],
})
export class OrderItemsModule {} 