import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItems } from '../entities/cartItems.entity';
import { CreateCartItemDto } from '../dtos/createCartItem.dto';
import { Cart } from '../entities/cart.entity';
import { CreateCartDto } from '../dtos/createCart.dto';

@Injectable()
export class CartRepository{
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
    ) {}        

    // create a new Cart
    async createCart(createCartDto: CreateCartDto): Promise<Cart> {
        try{
            const cart = this.cartRepository.create(createCartDto);
            return this.cartRepository.save(cart);
        }catch(error){
            console.error('Error in creating new cart', error.message);
            throw new InternalServerErrorException('Error in creating new cart');
        }
    }

    // remove a cart
    async removeCart(cartId: string): Promise<boolean> {
        try{
            const result = await this.cartRepository.delete(cartId);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in removing a cart', error.message);
            throw new InternalServerErrorException('Error in removing a cart');
        }
    }

    // Check if Cart exists for the customer
    async checkCartExists(customerId: string): Promise<Cart | null> {
      try{
        return this.cartRepository.findOne({where: {customerId}});
      }
      catch(error){
        console.error('Error in checking if cart exists', error.message);
        throw new InternalServerErrorException('Error in checking if cart exists');
      }
    }
}