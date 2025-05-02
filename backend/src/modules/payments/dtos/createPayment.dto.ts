import { IsNotEmpty, IsString } from "class-validator";

export class CreatePaymentDto{
    @IsNotEmpty()
    @IsString()
    customerId: string;

    @IsNotEmpty()
    @IsString()
    transactionId: string;

    @IsNotEmpty()
    @IsString()
    amount: number;
}