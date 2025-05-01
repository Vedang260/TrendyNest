import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateCategoryDto } from "../dtos/createCategory.dto";
import { Categories } from "../entities/category.entity";
import { CategoryRepository } from "../repositories/category.repository";
import { UpdateCategoryDto } from "../dtos/updateCategory.dto";

@Injectable()
export class CategoryService{
    constructor(
        private readonly categoryRepository: CategoryRepository,
    ){}

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<{ success: boolean; message: string; category: Categories | null}>{
        try{
            // Check if the category already exists
            const category = await this.categoryRepository.findCategoryByName(createCategoryDto.name);
            if(!category){
                // Call your repository function with the new object
                const newCategory = await this.categoryRepository.createCategory(createCategoryDto);

                if(newCategory){
                    return {
                        success: true,
                        message: 'New Category is added successfully',
                        category: newCategory
                    }
                }
            }
            throw new Error('Category alreads exists');
        }catch(error){
            console.error('Error in creating a new Category: ', error.message);
            return {
                success: false,
                message: 'Failed to create a new category',
                category: null
            }
        }
    }

    async updateCategory(categoryId: string, updateCategoryDto: UpdateCategoryDto): Promise<{success: boolean; message: string;}>{
        try{
            await this.categoryRepository.updateCategory(categoryId, updateCategoryDto);
            return {
                success: true,
                message: 'Your category is updated successfully'
            }
        }catch(error){
            console.error('Error in updating the category: ', error.message);
            return {
                success: false,
                message: error.message
            }
        }
    }

    async deleteCategory(categoryId: string): Promise<{success: boolean; message: string; }>{
        try{
            const res = await this.categoryRepository.deleteCategory(categoryId);
            if(res){
                return {
                    success: true,
                    message: 'Category is deleted successfully'
                }
            }
            return{
                success: false,
                message: 'Failed to delete category'
            }
        }catch(error){
            console.error('Error in deleting a category: ', error.message);
            return{
                success: false,
                message: error.message
            }
        }
    }

    async getAllCategories(): Promise<{success: boolean; message: string; categories: Categories[] | null}> {
        try{
            const categories = await this.categoryRepository.findAll();
            return {
                success: true,
                message: 'All Categories are fetched',
                categories: categories
            }
        }catch(error){
            console.error('Error in fetching all categories:', error.message);
            throw new InternalServerErrorException('Error in fetching all categories');
        }
    }

    async getAllCategoriesAndSubCategories() {
        try{
            const categories = await this.getAllCategoriesAndSubCategories();
            return{
                success: true,
                message: 'All data is fetched',
                categories: categories
            }
        }catch(error){
            console.error('Error in fetching all categories & subCategories:', error.message);
            throw new InternalServerErrorException('Error in fetching all categories & subCategories');
        }
    }
}