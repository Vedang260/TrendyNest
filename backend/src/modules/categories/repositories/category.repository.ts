import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from '../entities/category.entity';
import { CreateCategoryDto } from '../dtos/createCategory.dto';
import { UpdateCategoryDto } from '../dtos/updateCategory.dto';

@Injectable()
export class CategoryRepository{
    constructor(
        @InjectRepository(Categories)
        private readonly categoryRepository: Repository<Categories>,
    ) {}        

    // finds the user by email
    async findCategoryByName(name: string): Promise<Categories | null> {
        try{
            return this.categoryRepository.findOne({ where: { name } });
        }catch(error){
            console.error('Error in finding category by name: ', error.message);
            throw new InternalServerErrorException('Error in finding category by name');
        }
    }

    // creates new category
    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Categories> {
        try{
            const user = this.categoryRepository.create(createCategoryDto);
            return this.categoryRepository.save(user);
        }catch(error){
            console.error('Error in creating new category ', error.message);
            throw new InternalServerErrorException('Error in creating new category');
        }
    }

    // deletes a category
    async deleteCategory(categoryId: string): Promise<boolean> {
        try{
            const result = await this.categoryRepository.delete(categoryId);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in deleting a category ', error.message);
            throw new InternalServerErrorException('Error in deleting a category');
        }
    }

    async updateCategory(categoryId: string, updateCategoryDto: UpdateCategoryDto): Promise<boolean>{
        try{
            const result = await this.categoryRepository.update({ categoryId}, updateCategoryDto);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in updating a category ', error.message);
            throw new InternalServerErrorException('Error in updating a category');
        }
    }

    // get all categories
    async findAll(): Promise<Categories[]> {
      try{
        return this.categoryRepository.find();
      }
      catch(error){
        console.error('Error in fetching all the Categories', error.message);
        throw new InternalServerErrorException('Error in fetching all the Categories');
      }
    }
}