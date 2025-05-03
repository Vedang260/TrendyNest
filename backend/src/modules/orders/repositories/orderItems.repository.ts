import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderItems } from "../entities/orderItems.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderItemsRepository{
    constructor(
        @InjectRepository(OrderItems)
        private readonly orderItemsRepository: Repository<OrderItems>,
    ) {}

    async addOrderItems(){
        
    }
}