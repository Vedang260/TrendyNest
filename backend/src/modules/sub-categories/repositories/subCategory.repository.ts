import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubCategories } from '../entities/subCategory.entity';
import { CreateSubCategoryDto } from '../dtos/createSubCategory.dto';
import { UpdateSubCategoryDto } from '../dtos/updateSubCategory.dto';

@Injectable()
export class SubCategoryRepository{
    constructor(
        @InjectRepository(SubCategories)
        private readonly subCategoryRepository: Repository<SubCategories>,
    ) {}        

    // finds the user by email
    async findSubCategoryByName(name: string): Promise<SubCategories | null> {
        try{
            return this.subCategoryRepository.findOne({ where: { name } });
        }catch(error){
            console.error('Error in finding sub-category by name: ', error.message);
            throw new InternalServerErrorException('Error in finding sub-category by name');
        }
    }

    // creates new category
    async createSubCategory(createSubCategoryDto: CreateSubCategoryDto): Promise<SubCategories> {
        try{
            const user = this.subCategoryRepository.create(createSubCategoryDto);
            return this.subCategoryRepository.save(user);
        }catch(error){
            console.error('Error in creating new sub-category ', error.message);
            throw new InternalServerErrorException('Error in creating new sub-category');
        }
    }

    // deletes a category
    async deleteSubCategory(subCategoryId: string): Promise<boolean> {
        try{
            const result = await this.subCategoryRepository.delete(subCategoryId);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in deleting a sub-category ', error.message);
            throw new InternalServerErrorException('Error in deleting a sub-category');
        }
    }

    async updateSubCategory(subCategoryId: string, updateSubCategoryDto: UpdateSubCategoryDto): Promise<boolean>{
        try{
            const result = await this.subCategoryRepository.update({ subCategoryId}, updateSubCategoryDto);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in updating a sub-category ', error.message);
            throw new InternalServerErrorException('Error in updating a sub-category');
        }
    }

    // get all sub-categories
    async findAll(): Promise<SubCategories[]> {
      try{
        return this.subCategoryRepository.find();
      }
      catch(error){
        console.error('Error in getting all sub-categories ', error.message);
        throw new InternalServerErrorException('Error in getting all sub-categories');
      }
    }

    // Get all SubCategories based on categoryId
    async getSubCategories(categoryId: string): Promise<SubCategories[]>{
        try{
            return this.subCategoryRepository.find({
                select: ['subCategoryId', 'name'],
                where: {categoryId}
            });
        }catch(error){
            console.error('Error in getting all sub-categories based on a CategoryId', error.message);
            throw new InternalServerErrorException('Error in getting all sub-categories based on a categoryId');
        }
    }
}