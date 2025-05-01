export interface Category{
    categoryId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryResponse{
    success: boolean;
    message: string;
    categories: Category[];
}