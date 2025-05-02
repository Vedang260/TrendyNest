import { IsNotEmpty } from "class-validator";

export class createNotificationDto{
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    message: string;
}