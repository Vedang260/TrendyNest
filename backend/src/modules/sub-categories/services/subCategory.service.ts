import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateSubCategoryDto } from "../dtos/createSubCategory.dto";
import { SubCategories } from "../entities/subCategory.entity";
import { SubCategoryRepository } from "../repositories/subCategory.repository";
import { UpdateSubCategoryDto } from "../dtos/updateSubCategory.dto";

@Injectable()
export class SubCategoryService{
    constructor(
        private readonly subCategoryRepository: SubCategoryRepository,
    ){}

    async createSubCategory(createSubCategoryDto: CreateSubCategoryDto): Promise<{ success: boolean; message: string; subCategory: SubCategories | null}>{
        try{
            // Check if the category already exists
            const subCategory = await this.subCategoryRepository.findSubCategoryByName(createSubCategoryDto.name);
            if(!subCategory){
                // Call your repository function with the new object
                const newSubCategory = await this.subCategoryRepository.createSubCategory(createSubCategoryDto);

                if(newSubCategory){
                    return {
                        success: true,
                        message: 'New Sub Category is added successfully',
                        subCategory: newSubCategory
                    }
                }
            }
            throw new Error('Sub Category alreads exists');
        }catch(error){
            console.error('Error in creating a new Sub Category: ', error.message);
            return {
                success: false,
                message: 'Failed to create a new sub category',
                subCategory: null
            }
        }
    }

    async updateSubCategory(subCategoryId: string, updateSubCategoryDto: UpdateSubCategoryDto): Promise<{success: boolean; message: string;}>{
        try{
            await this.subCategoryRepository.updateSubCategory(subCategoryId, updateSubCategoryDto);
            return {
                success: true,
                message: 'Your sub category is updated successfully'
            }
        }catch(error){
            console.error('Error in updating the sub category: ', error.message);
            return {
                success: false,
                message: error.message
            }
        }
    }

    async deleteSubCategory(subCategoryId: string): Promise<{success: boolean; message: string; }>{
        try{
            const res = await this.subCategoryRepository.deleteSubCategory(subCategoryId);
            if(res){
                return {
                    success: true,
                    message: 'Sub Category is deleted successfully'
                }
            }
            return{
                success: false,
                message: 'Failed to delete sub category'
            }
        }catch(error){
            console.error('Error in deleting a sub category: ', error.message);
            return{
                success: false,
                message: error.message
            }
        }
    }

    async getAllSubCategories(): Promise<{success: boolean; message: string; subCategories: SubCategories[] | null}> {
        try{
            const subCategories = await this.subCategoryRepository.findAll();
            return {
                success: true,
                message: 'All Sub Categories are fetched',
                subCategories: subCategories
            }
        }catch(error){
            console.error('Error in fetching all sub categories:', error.message);
            return {
                success: false,
                message: 'Failed to fetch All Sub Categories',
                subCategories: null
            }
        }
    }

    async getSubCategoriesByCategory(categoryId: string): Promise<{success: boolean; message: string; subCategories: SubCategories[] | null}> {
        try{
            const subCategories = await this.subCategoryRepository.getSubCategories(categoryId);
            return {
                success: true,
                message: 'All Sub Categories are fetched',
                subCategories: subCategories
            }
        }catch(error){
            console.error('Error in fetching all sub categories:', error.message);
            return {
                success: false,
                message: 'Failed to fetch all Sub Categories',
                subCategories: null
            }
        }
    }
}