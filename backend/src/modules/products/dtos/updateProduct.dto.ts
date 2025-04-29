import { IsOptional, IsString } from "class-validator";
import { ProductStatus } from "src/common/enums/productStatus.enums";
import { ProductStockStatus } from "src/common/enums/productStockStatus.enums";

export class UpdateProductDto{
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    brand?: string;

    @IsOptional()
    price?: number;

    @IsOptional()
    stockQuantity?: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    mainImage?: string;
    
    @IsOptional()
    availabilityStatus?: ProductStockStatus;
    
    @IsOptional()
    status?: ProductStatus;
}