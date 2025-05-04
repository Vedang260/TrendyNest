import { Injectable } from "@nestjs/common";
import { OrderStatus } from "src/common/enums/orderStatus.enums";
import { OrderItemsRepository } from "../repositories/orderItems.repository";
import { CreateOrderItemsDto } from "../dtos/createOrderItems.dto";
import { OrderItemStatus } from "src/common/enums/orderItemStatus.enums";

@Injectable()
export class OrderItemsService{
    constructor(
        private readonly orderItemsRepository: OrderItemsRepository
    ){} 
    
    async addOrderItems(createOrderItemsDto: CreateOrderItemsDto[]) {
        try{
            const orderItems = await this.orderItemsRepository.addOrderItems(createOrderItemsDto);
            return {
                success: true,
                message: 'Order Items are added into the Order'
            }
        }catch(error){
            console.error('Error in adding Order Items in an order: ', error.message);
            return{
                succcess: false,
                message: 'Failed to add Order Items into the order'
            }
        }
    }

    async fetchOrderItems(orderId: string){
        try{
            const orderItems = await this.orderItemsRepository.fetchOrderItems(orderId);
            return{
                success: true,
                message: 'Track your Order Items',
                orderItems: orderItems
            }
        }catch(error){
            console.error('Error in fetching all the order Items of the Order: ', error.message);
            return{
                success: false,
                message: 'Failed to fetch the order Items',
                orderItems: null
            }
        }
    }

    async updateOrderItemsStatus(orderItemsId: string, status: OrderItemStatus){
        try{
            const result = await this.orderItemsRepository.updateOrderItems(orderItemsId, status);
            if(result){
                return{
                    success: true,
                    message:  `Your Order Item is updated to ${status}`
                }
            }
        }catch(error){
            console.error('Error in updating the Order ItemStatus: ', error.message);
            return{
                success: false,
                message: 'Failed to update the Order Item Status'
            }
        }
    }   
}