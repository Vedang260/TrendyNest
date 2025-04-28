import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendorStores } from '../entities/vendorStore.entity';
import { CreateVendorStoreDto } from '../dtos/createVendorStore.dto';
import { UpdateVendorStoreDto } from '../dtos/updateVendorStore.dto';

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

    // deletes a vendor store
    async deleteVendorStore(vendorStoreId: string): Promise<boolean> {
        try{
            const result = await this.vendorStoreRepository.delete(vendorStoreId);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in deleting a vendor store ', error.message);
            throw new InternalServerErrorException('Error in deleting a vendor store');
        }
    }

    // update vendor store
    async updateVendorStore(vendorStoreId: string, updateVendorStoreDto: UpdateVendorStoreDto): Promise<boolean>{
        try{
            const result = await this.vendorStoreRepository.update({ vendorStoreId}, updateVendorStoreDto);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in updating a vendor store', error.message);
            throw new InternalServerErrorException('Error in updating a vendor store');
        }
    }

    // get a vendor store by VendorId
    async getVendorStore(vendorId: string): Promise<VendorStores[]>{
        try{
            return await this.vendorStoreRepository.find({ where: {vendorId}});
        }catch(error){
            console.error('Error in fetching a vendor store by vendorId', error.message);
            throw new InternalServerErrorException('Error in fetching a vendor store by vendorId');
        }
    }
}