import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "../entities/orders.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from "../dtos/createOrder.dto";
import { OrderStatus } from "src/common/enums/orderStatus.enums";

@Injectable()
export class OrdersRepository{
    constructor(
            @InjectRepository(Orders)
            private readonly ordersRepository: Repository<Orders>,
    ) {} 

    async placeOrder(createOrderDto: CreateOrderDto): Promise<Orders|null>{
        try{
            const newOrder = this.ordersRepository.create(createOrderDto);
            return await this.ordersRepository.save(newOrder);
        }catch(error){
            console.error('Error in placing an order: ', error.message);
            throw new InternalServerErrorException('Error in placing an order');
        }
    }

    async getOrder(customerId: string): Promise<Orders[]>{
        try{
            return await this.ordersRepository.find({ where: { customerId }});
        }catch(error){
            console.error('Error in fetching all the orders of the Customer: ', error.message);
            throw new InternalServerErrorException('Error in placing an order');
        }
    }

    async updateOrderStatus(orderId: string, status: OrderStatus): Promise<boolean>{
        try{
            const result = await this.ordersRepository.update({ orderId }, { status });
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in updating the Order Status: ', error.message);
            throw new InternalServerErrorException('Error in updating the order status');
        }
    }   
}