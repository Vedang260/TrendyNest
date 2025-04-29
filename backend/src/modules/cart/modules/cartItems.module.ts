import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../entities/cart.entity';
import { CartItems } from '../entities/cartItems.entity';
import { CartItemsController } from '../controllers/cartItems.controller';
import { CartItemsService } from '../services/cartItems.service';
import { CartItemsRepository } from '../repositories/cartItems.repository';
import { CartRepository } from '../repositories/cart.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItems])],
  controllers: [CartItemsController],
  providers: [CartItemsService, CartItemsRepository, CartRepository],
  exports: [CartItemsService, CartItemsRepository, CartRepository],
})
export class CartItemsModule {} 