import { IsNotEmpty, IsString } from "class-validator";

export class CreateCartItemDto{
    @IsNotEmpty()
    @IsString()
    cartId: string;

    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    quantity: number;
}