export interface SubCategory{
    subCategoryId: string;
    categoryId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface SubCategoryResponse{
    success: boolean;
    message: string;
    subCategories: SubCategory[];
}