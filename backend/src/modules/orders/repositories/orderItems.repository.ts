import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderItems } from "../entities/orderItems.entity";
import { DataSource, Repository } from "typeorm";
import { CreateOrderItemsDto } from "../dtos/createOrderItems.dto";
import { OrderItemStatus } from "src/common/enums/orderItemStatus.enums";

@Injectable()
export class OrderItemsRepository{
    constructor(
        private readonly dataSource: DataSource,
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

    async getSalesDataForProduct(productId: string){
        try {
            const result = await this.dataSource.query(`
                WITH months AS (
                    SELECT DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '3 months' AS month
                    UNION ALL
                    SELECT DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '2 months'
                    UNION ALL
                    SELECT DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month'
                    UNION ALL
                    SELECT DATE_TRUNC('month', CURRENT_DATE)
                ),
                product_data AS (
                    SELECT 
                        DATE_TRUNC('month', "createdAt") AS month,
                        SUM(quantity) AS quantity
                    FROM 
                        public.order_items
                    WHERE 
                        "productId" = $1
                        AND "createdAt" >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '3 months'
                    GROUP BY 
                        DATE_TRUNC('month', "createdAt")
                )
                SELECT 
                    array_agg(COALESCE(p.quantity, 0) ORDER BY m.month) AS quantity_array
                FROM 
                    months m
                LEFT JOIN 
                    product_data p ON m.month = p.month;
            `, [productId]); // Using parameterized query to prevent SQL injection
    
            return result[0]?.quantity_array || []; // safe access
        } catch (error) {
            console.error('Error in fetching the sales data for the product: ', error.message);
            throw new InternalServerErrorException('Error in fetching the sales of the product');
        }
    }    
}