import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrderItemsDto{
    @IsNotEmpty()
    @IsString()
    orderId: string;
    
    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    price: number;
}