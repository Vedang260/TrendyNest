import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CartItemsRepository } from "../repositories/cartItems.repository";
import { CreateCartItemDto } from "../dtos/createCartItem.dto";
import { CartItems } from "../entities/cartItems.entity";
import { CartRepository } from "../repositories/cart.repository";
import { CreateCartDto } from "../dtos/createCart.dto";

@Injectable()
export class CartItemsService{
    constructor(
        private readonly cartItemsRepository: CartItemsRepository,
        private readonly cartRepository: CartRepository,
    ){}

    async addCartItem(customerId: string, createCartItemDto: Partial<CreateCartItemDto>): Promise<{ success: boolean; message: string; cartItems: CartItems | null}>{
        try{
            // Check if cart already exists
            let cart = await this.cartRepository.checkCartExists(customerId);

            if(!cart){
                const cartDto : CreateCartDto = {
                    customerId: customerId
                }
                cart = await this.cartRepository.createCart(cartDto);
            }
            createCartItemDto.cartId = cart.cartId;
            const newCartItem = await this.cartItemsRepository.addCartItem(createCartItemDto);
            if(newCartItem){
                return {
                    success: true,
                    message: 'Product is added to the cart',
                    cartItems: newCartItem
                }
            }
            return {
                success: false,
                message: 'Failed to add a product',
                cartItems: null
            }
        }catch(error){
            console.error('Error in adding a new Cart Item: ', error.message);
            return {
                success: false,
                message: 'Failed to add a new Cart Item',
                cartItems: null
            }
        }
    }

    async updateCartItem(cartItemId: string, quantity: number): Promise<{success: boolean; message: string;}>{
        try{
            console.log("CartItem : ", cartItemId);
            console.log("quantity: ", quantity);
            await this.cartItemsRepository.updateCartItem(cartItemId, quantity);
            return {
                success: true,
                message: 'Your cart-item is updated successfully'
            }
        }catch(error){
            console.error('Error in updating the cart-item: ', error.message);
            return {
                success: false,
                message: error.message
            }
        }
    }

    async removeCartItem(cartItemId: string): Promise<{success: boolean; message: string; }>{
        try{
            const res = await this.cartItemsRepository.removeCartItem(cartItemId);
            if(res){
                return {
                    success: true,
                    message: 'Cart Item is removed successfully'
                }
            }
            return{
                success: false,
                message: 'Failed to remove cart Item'
            }
        }catch(error){
            console.error('Error in removing a Cart Item: ', error.message);
            return{
                success: false,
                message: error.message
            }
        }
    }

    async getAllCartItems(customerId: string): Promise<{success: boolean; message: string; cartItems: any[] | null}> {
        try{
            const cart = await this.cartRepository.checkCartExists(customerId);
            if(cart){
                const cartItems = await this.cartItemsRepository.getAllCartItems(cart?.cartId);
                return {
                    success: true,
                    message: 'All Cart-Items are fetched successfully',
                    cartItems: cartItems
                }
            }
            return{
                success: true,
                message: 'Plz add items into the Cart',
                cartItems: null
            }
        }catch(error){
            console.error('Error in fetching all cartItems:', error.message);
            return {
                success: false,
                message: 'Failed to fetch All cartItems',
                cartItems: null
            }
        }
    }

    async clearCartItems(customerId: string){
        try{
            const cart = await this.cartRepository.checkCartExists(customerId);
            if(cart){
                await this.cartItemsRepository.clearCartItems(cart.cartId);
            }else{
                throw new Error('Cart is not found.');
            }
        }catch(error){
            console.error('Error in clearing the Cart Items: ', error.message);
        }
    }
}