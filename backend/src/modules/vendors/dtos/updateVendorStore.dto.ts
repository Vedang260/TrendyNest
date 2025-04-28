import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { StoreStatus } from "src/common/enums/storeStatus.enums";

export class UpdateVendorStoreDto{
    @IsOptional()
    @IsString()
    store_name?: string;

    @IsOptional()
    @IsString()
    store_description?: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    business_email?: string;

    @IsOptional()
    @IsString()
    business_phone?: string;

    @IsOptional()
    status?: StoreStatus; 
}