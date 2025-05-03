import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderItems } from "../entities/orderItems.entity";
import { Repository } from "typeorm";
import { CreateOrderItemsDto } from "../dtos/createOrderItems.dto";
import { OrderItemStatus } from "src/common/enums/orderItemStatus.enums";

@Injectable()
export class OrderItemsRepository{
    constructor(
        @InjectRepository(OrderItems)
        private readonly orderItemsRepository: Repository<OrderItems>,
    ) {}

    async addOrderItems(createOrderItemsDto: CreateOrderItemsDto[]): Promise<OrderItems[] | null>{
        try{
            const newOrderItems = this.orderItemsRepository.create(createOrderItemsDto);
            return await this.orderItemsRepository.save(newOrderItems);
        }catch(error){
            console.error('Error in adding order Items: ', error.message);
            throw new InternalServerErrorException('Error in adding order Items');
        }
    }

    async fetchOrderItems(orderId: string){
        try{
            const orderItems = await this.orderItemsRepository.find({
                relations: ['product'],
                where: { orderId }
            });
            return orderItems.map((item) => ({
                orderItemsId: item.orderItemsId,
                mainImage: item.product?.mainImage,
                productName: item.product?.name,
                quantity: item.quantity,
                price: item.price,
                status: item.status
            }));
        }catch(error){
            console.error('Error in fetching the OrderItems: ',error.message);
            throw new InternalServerErrorException('Error in fetching the order Items');
        }
    }

    async updateOrderItems(orderItemsId: string, status: OrderItemStatus){
        try{
            const result = await this.orderItemsRepository.update({ orderItemsId }, { status });
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in updating the status of the Order Item: ', error.message);
            throw new InternalServerErrorException('Error in updating the order Items status');
        }
    }
}