import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "../entities/orders.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrdersRepository{
    constructor(
            @InjectRepository(Orders)
            private readonly productsRepository: Repository<Orders>,
    ) {} 

    
}