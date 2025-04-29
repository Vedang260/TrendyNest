import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { VendorStoreRepository } from "../repositories/vendorStore.repository";
import { AddressesRepository } from "../repositories/addresses.repository";
import { CreateVendorStoreDto } from "../dtos/createVendorStore.dto";
import { CreateAddressDto } from "../dtos/createAddress.dto";
import { UpdateVendorStoreDto } from "../dtos/updateVendorStore.dto";
import { VendorStores } from "../entities/vendorStore.entity";

@Injectable()
export class VendorStoreService{
    constructor(
        private readonly vendorStoreRepository: VendorStoreRepository,
        private readonly addressRepository: AddressesRepository,
    ) {}

    async createVendorStore(createVendorStoreDto: Partial<CreateVendorStoreDto>, addressDto: CreateAddressDto): Promise<{ success: boolean; message: string;}>{
        try{
            // check if the address already exists
            let address = await this.addressRepository.checkAddressExists(addressDto);

            if(!address){
                address = await this.addressRepository.addNewAddress(addressDto);
            }
            if (!address) {
                throw new Error('Failed to create or find address');
            }
            createVendorStoreDto.addressId = address?.addressId;

            // Call your repository function with the new object
            const newVendorStore = await this.vendorStoreRepository.createNewStore(createVendorStoreDto);

            if(newVendorStore){
                return {
                    success: true,
                    message: 'New Vendor Store is added successfully',
                }
            }
            
            throw new Error('The store already exists');
        }catch(error){
            console.error('Error in creating a new Vendor Store: ', error.message);
            return {
                success: false,
                message: 'Failed to create a new vendor store',
            }
        }
    }
    
    async updateVendorStore(vendorStoreId: string, updateVendorStoreDto: UpdateVendorStoreDto): Promise<{success: boolean; message: string;}>{
        try{
            await this.vendorStoreRepository.updateVendorStore(vendorStoreId, updateVendorStoreDto);
            return {
                success: true,
                message: 'Your vendor store is updated successfully'
            }
        }catch(error){
            console.error('Error in updating the vendor store: ', error.message);
            return {
                success: false,
                message: error.message
            }
        }
    }
    
    async deleteVendorStore(vendorStoreId: string): Promise<{success: boolean; message: string; }>{
        try{
            const res = await this.vendorStoreRepository.deleteVendorStore(vendorStoreId);
            if(res){
                return {
                    success: true,
                    message: 'Vendor Store is deleted successfully'
                }
            }
            return{
                success: false,
                message: 'Failed to delete vendor Store'
            }
        }catch(error){
            console.error('Error in deleting a vendor store: ', error.message);
            return{
                success: false,
                message: error.message
            }
        }
    }
    
    async getAllVendorStores(): Promise<{success: boolean; message: string; vendorStores: VendorStores[] | null}> {
        try{
            const vendorStores = await this.vendorStoreRepository.getAllVendorStores();
            return {
                success: true,
                message: 'All Vendor Stores are fetched',
                vendorStores: vendorStores
            }
        }catch(error){
            return{
                success: false,
                message: 'Failed to fetch All the stores',
                vendorStores: null
            }
        }
    }
    
    async getVendorStoreByVendorId(vendorId: string): Promise<{success: boolean; message: string; vendorStores: VendorStores[] | null}> {
        try{
            const vendorStores = await this.vendorStoreRepository.getVendorStore(vendorId);
            return {
                success: true,
                message: 'All Vendor Stores are fetched',
                vendorStores: vendorStores
            }
        }catch(error){
            console.error('Error in fetching all vendor stores:', error.message);
            throw new InternalServerErrorException('Error in fetching all vendor stores');
        }
    }
}