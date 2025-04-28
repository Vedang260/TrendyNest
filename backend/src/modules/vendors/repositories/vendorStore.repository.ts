import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendorStores } from '../entities/vendorStore.entity';
import { CreateVendorStoreDto } from '../dtos/createVendorStore.dto';

@Injectable()
export class VendorStoreRepository{
    constructor(
        @InjectRepository(VendorStores)
        private readonly vendorStoreRepository: Repository<VendorStores>,
    ) {}        

    // creates new store
    async createNewStore(createVendorStoreDto: CreateVendorStoreDto): Promise<VendorStores> {
        try{
            const newVendorStore = this.vendorStoreRepository.create(createVendorStoreDto);
            return this.vendorStoreRepository.save(newVendorStore);
        }catch(error){
            console.error('Error in creating new vendor store ', error.message);
            throw new InternalServerErrorException('Error in creating new vendor store');
        }
    }

    // deletes a category
    async deleteVendorStore(vendorStoreId: string): Promise<boolean> {
        try{
            const result = await this.vendorStoreRepository.delete(vendorStoreId);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in deleting a vendor store ', error.message);
            throw new InternalServerErrorException('Error in deleting a vendor store');
        }
    }

    async updateVendorStore(subCategoryId: string, updateSubCategoryDto: UpdateSubCategoryDto): Promise<boolean>{
        try{
            const result = await this.vendorStoreRepository.update({ subCategoryId}, updateSubCategoryDto);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in updating a sub-category ', error.message);
            throw new InternalServerErrorException('Error in updating a sub-category');
        }
    }

    // get all sub-categories
    async findAll(): Promise<SubCategories[]> {
      try{
        return this.vendorStoreRepository.find({
            select: ['subCategoryId', 'name']
        });
      }
      catch(error){
        console.error('Error in getting all sub-categories ', error.message);
        throw new InternalServerErrorException('Error in getting all sub-categories');
      }
    }

    // Get all SubCategories based on categoryId
    async getSubCategories(categoryId: string): Promise<SubCategories[]>{
        try{
            return this.vendorStoreRepository.find({
                select: ['subCategoryId', 'name'],
                where: {categoryId}
            });
        }catch(error){
            console.error('Error in getting all sub-categories based on a CategoryId', error.message);
            throw new InternalServerErrorException('Error in getting all sub-categories based on a categoryId');
        }
    }
}