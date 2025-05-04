import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../entities/cart.entity';
import { CartItems } from '../entities/cartItems.entity';
import { CartItemsController } from '../controllers/cartItems.controller';
import { CartItemsService } from '../services/cartItems.service';
import { CartItemsRepository } from '../repositories/cartItems.repository';
import { CartRepository } from '../repositories/cart.repository';
import { BullModule } from '@nestjs/bull';
import { CartItemsProcessor } from '../processor/cartItems.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItems]),
    BullModule.registerQueue({
      name: 'cartItemsQueue',
    }),
  ],
  controllers: [CartItemsController],
  providers: [CartItemsService, CartItemsRepository, CartRepository, CartItemsProcessor],
  exports: [CartItemsService, CartItemsRepository, CartRepository, BullModule],
})
export class CartItemsModule {} 