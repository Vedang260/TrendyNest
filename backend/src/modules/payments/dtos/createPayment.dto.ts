import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePaymentDto{
    @IsNotEmpty()
    @IsString()
    customerId: string;

    @IsOptional()
    @IsString()
    transactionId: string;

    @IsNotEmpty()
    @IsString()
    amount: number;
}