import { IsNotEmpty } from "class-validator";

export class CreateProductStock{
    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
    stockQuantity: number;
}