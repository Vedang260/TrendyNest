import { IsNotEmpty } from "class-validator";

export class CreateProductStockDto{
    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
    stockQuantity: number;
}