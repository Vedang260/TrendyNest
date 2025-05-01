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