import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItems } from '../entities/cartItems.entity';
import { CreateCartItemDto } from '../dtos/createCartItem.dto';

@Injectable()
export class CartItemsRepository{
    constructor(
        @InjectRepository(CartItems)
        private readonly cartItemsRepository: Repository<CartItems>,
    ) {}        

    // add new cart item
    async addCartItem(createCartItemDto: Partial<CreateCartItemDto>): Promise<CartItems> {
        try{
            const cartItem = this.cartItemsRepository.create(createCartItemDto);
            return this.cartItemsRepository.save(cartItem);
        }catch(error){
            console.error('Error in creating new cart Item ', error.message);
            throw new InternalServerErrorException('Error in creating new cart Item');
        }
    }

    // remove a cart Item
    async removeCartItem(cartItemsId: string): Promise<boolean> {
        try{
            const result = await this.cartItemsRepository.delete(cartItemsId);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in removing a cart-item ', error.message);
            throw new InternalServerErrorException('Error in removing a cart-item');
        }
    }

    // update cart Item
    async updateCartItem(cartItemsId: string, quantity: number): Promise<boolean>{
        try{
            const result = await this.cartItemsRepository.update({ cartItemsId}, {quantity});
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in updating the quantity of the cart Item', error.message);
            throw new InternalServerErrorException('Error in updating the quantity of the cart Item');
        }
    }

    // get all cart-items
    async getAllCartItems(cartId: string): Promise<any[]> {
        try {
          const cartItems = await this.cartItemsRepository
            .createQueryBuilder('cart_items')
            .leftJoinAndSelect('cart_items.product', 'product')
            .leftJoinAndSelect('product.subCategory', 'subCategory')
            .where('cart_items.cartId = :cartId', { cartId })
            .select([
              'cart_items.cartItemsId',
              'cart_items.quantity',
              'product.productId',
              'product.name',
              'product.mainImage',
              'product.price',
              'subCategory.name',
            ])
            .getMany();
      
          return cartItems;
        } catch (error) {
          console.error('❌ Error in getting all cart-items:', error.message);
          throw new InternalServerErrorException('Error in getting all cart-items');
        }
      }
      
}