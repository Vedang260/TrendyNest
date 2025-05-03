import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "../repositories/orders.repository";
import { CreateOrderDto } from "../dtos/createOrder.dto";
import { OrderStatus } from "src/common/enums/orderStatus.enums";

@Injectable()
export class OrderService{
    constructor(
        private readonly ordersRepository: OrdersRepository
    ){} 
    
    async placeOrder(createOrderDto: CreateOrderDto) {
        try{
            const order = this.ordersRepository.placeOrder(createOrderDto);
            return {
                success: true,
                message: 'Order is created successfully',
                order: order
            }
        }catch(error){
            console.error('Error in placing an order: ', error.message);
            return{
                succcess: false,
                message: 'Failed to place an Order'
            }
        }
    }

    async getAllOrders(){
        try{
            const orders = this.ordersRepository.getAllOrders();
            return{
                success: true,
                message: 'All orders are fetched',
                orders: orders
            }
        }catch(error){
            console.error('Error in fetching all the orders: ', error.message);
            return{
                success: false,
                message: 'Failed to fetch the orders',
                orders: null
            }
        }
    }
    
    async getOrder(customerId: string){
        try{
            const orders = this.ordersRepository.getOrder(customerId);
            return{
                success: true,
                message: 'Track your Orders',
                orders: orders
            }
        }catch(error){
            console.error('Error in fetching all the orders of the Customer: ', error.message);
            return{
                success: false,
                message: 'Failed to fetch the orders',
                orders: null
            }
        }
    }

    async updateOrderStatus(orderId: string, status: OrderStatus){
        try{
            const result = await this.ordersRepository.updateOrderStatus(orderId, status);
            if(result){
                return{
                    success: true,
                    message:  `Your Order is updated to ${status}`
                }
            }
        }catch(error){
            console.error('Error in updating the Order Status: ', error.message);
            return{
                success: false,
                message: 'Failed to update the Order Status'
            }
        }
    }   
}