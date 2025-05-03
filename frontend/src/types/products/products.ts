export interface AdminProducts{
    productId: string;
    name: string;
    brand: string;
    price: number;
    description: string;
    mainImage: string;
    bestseller: boolean;
    createdAt: string;
    updatedAt: string;
    subCategoryName: string;
    stockQuantity: number;
    availabilityStatus: string;
}

export interface AdminProductsResponse {
    success: boolean;
    message: string;
    products: AdminProducts[];
}

export interface ShopProducts{
    productId: string;
    subCategoryId: string;
    name: string;
    brand: string;
    price: number;
    description: string;
    mainImage: string;
    bestseller: boolean;
    subCategoryName: string;
    availabilityStatus: string;
}

export interface ShopProductsResponse {
    success: boolean;
    message: string;
    products: ShopProducts[];
}
