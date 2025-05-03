import { IsNotEmpty, IsString } from "class-validator";

export class createOrderDto{
    @IsNotEmpty()
    @IsString()
    customerId: string;

    @IsNotEmpty()
    @IsString()
    paymentId: string;

    @IsNotEmpty()
    totalAmount: number;
}