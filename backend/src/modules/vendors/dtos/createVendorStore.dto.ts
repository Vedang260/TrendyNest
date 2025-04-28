import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateVendorStoreDto{
    @IsNotEmpty()
    @IsString()
    vendorId: string;

    @IsNotEmpty()
    @IsString()
    categoryId: string;

    @IsNotEmpty()
    @IsString()
    addressId: string;

    @IsNotEmpty()
    @IsString()
    store_name: string;

    @IsNotEmpty()
    @IsString()
    store_description: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    business_email: string;

    @IsNotEmpty()
    @IsString()
    business_phone: string;
}