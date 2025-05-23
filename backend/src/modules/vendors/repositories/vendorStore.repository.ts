import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendorStores } from '../entities/vendorStore.entity';
import { CreateVendorStoreDto } from '../dtos/createVendorStore.dto';
import { UpdateVendorStoreDto } from '../dtos/updateVendorStore.dto';
import { StoreStatus } from 'src/common/enums/storeStatus.enums';

@Injectable()
export class VendorStoreRepository{
    constructor(
        @InjectRepository(VendorStores)
        private readonly vendorStoreRepository: Repository<VendorStores>,
    ) {}        

    // creates new store
    async createNewStore(createVendorStoreDto: Partial<CreateVendorStoreDto>): Promise<VendorStores> {
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

    async getAllVendorStores(): Promise<VendorStores[]>{
        try{
            return await this.vendorStoreRepository.find();
        }catch(error){
            console.error('Error in fetching all vendor stores', error.message);
            throw new InternalServerErrorException('Error in fetching all vendor stores');
        }
    }

    async getPendingVendorStoresForAdmin(){
        try{
            const vendorStores = await this.vendorStoreRepository.find({
                relations: ['addresses', 'category', 'users'],
                where: { status: StoreStatus.PENDING},
                order: {
                    createdAt: 'DESC'
                }
            });
            return vendorStores.map((store) => ({
                vendorStoreId: store.vendorStoreId,
                categoryName: store.category.name,
                storeName: store.store_name,
                storeDescription: store.store_description,
                businessEmail: store.business_email,
                businessPhone: store.business_phone,
                address: store.address,
                createdAt: store.createdAt,
                updatedAt: store.updatedAt,
            }));
        }catch(error){
            console.error('Error in fetching all pending vendor stores for admin', error.message);
            throw new InternalServerErrorException('Error in fetching all pending vendor stores for admin');
        }
    }

    async getApprovedVendorStoresForAdmin(){
        try{
            const vendorStores = await this.vendorStoreRepository.find({
                relations: ['addresses', 'category', 'users'],
                where: { status: StoreStatus.APPROVED},
                order: {
                    createdAt: 'DESC'
                }
            });
            return vendorStores.map((store) => ({
                vendorStoreId: store.vendorStoreId,
                categoryName: store.category.name,
                storeName: store.store_name,
                storeDescription: store.store_description,
                businessEmail: store.business_email,
                businessPhone: store.business_phone,
                address: store.address,
                createdAt: store.createdAt,
                updatedAt: store.updatedAt,
            }));
        }catch(error){
            console.error('Error in fetching all approved vendor stores for admin', error.message);
            throw new InternalServerErrorException('Error in fetching all approved vendor stores for admin');
        }
    }

    async getRejectedVendorStoresForAdmin(){
        try{
            const vendorStores = await this.vendorStoreRepository.find({
                relations: ['addresses', 'category', 'users'],
                where: { status: StoreStatus.REJECTED},
                order: {
                    createdAt: 'DESC'
                }
            });
            return vendorStores.map((store) => ({
                vendorStoreId: store.vendorStoreId,
                categoryName: store.category.name,
                storeName: store.store_name,
                storeDescription: store.store_description,
                businessEmail: store.business_email,
                businessPhone: store.business_phone,
                address: store.address,
                createdAt: store.createdAt,
                updatedAt: store.updatedAt,
            }));
        }catch(error){
            console.error('Error in fetching all rejected vendor stores for admin', error.message);
            throw new InternalServerErrorException('Error in fetching all rejected vendor stores for admin');
        }
    }
}