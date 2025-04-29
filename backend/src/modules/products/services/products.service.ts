import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ProductsRepository } from "../repositories/products.repository";
import { ProductStockRepository } from "../repositories/productStock.repository";
import { CreateProductStockDto } from "../dtos/createProductStock.dto";

@Injectable()
export class ProductService{
    constructor(
        private readonly productsRepository: ProductsRepository,
        private readonly productStockRepository: ProductStockRepository,
    ) {}

    async createProductStock(createProductStockDto: CreateProductStockDto): Promise<{ success: boolean; message: string;}>{
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
}