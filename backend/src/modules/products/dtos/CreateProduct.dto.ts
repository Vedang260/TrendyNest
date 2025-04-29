import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto{
    @IsNotEmpty()
    @IsString()
    subCategoryId: string;

    @IsNotEmpty()
    @IsString()
    vendorStoreId: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    brand: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    stockQuantity:number;
    
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    mainImage: string;
}