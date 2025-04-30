import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ProductsRepository } from "../repositories/products.repository";
import { ProductStockRepository } from "../repositories/productStock.repository";
import { CreateProductDto } from "../dtos/CreateProduct.dto";
import { CreateProductStockDto } from "../dtos/createProductStock.dto";
import { UpdateProductDto } from "../dtos/updateProduct.dto";
import { Products } from "../entities/products.entity";

@Injectable()
export class ProductService{
    constructor(
        private readonly productsRepository: ProductsRepository,
        private readonly productStockRepository: ProductStockRepository,
    ) {}

    async createNewProduct(createProductDto: CreateProductDto, createProductStockDto: Partial<CreateProductStockDto>): Promise<{ success: boolean; message: string;}>{
        try{
            const newProduct = await this.productsRepository.createNewProduct(createProductDto);
            if(!newProduct){
               throw new Error('Failed to create a new product');
            }
            if(createProductStockDto.stockQuantity){
                const createProductStock: CreateProductStockDto ={
                    productId: newProduct.productId,
                    stockQuantity: createProductStockDto?.stockQuantity
                }
                const newProductStock = await this.productStockRepository.createNewProductStock(createProductStock);
            }
            return{
                success: true,
                message: 'New Product is created successfully'
            }
        }catch(error){
            console.error('Error in creating a new Product: ', error.message);
            return {
                success: false,
                message: 'Failed to create a new product',
            }
        }
    }
    
    async updateProduct(productId: string, updateProductDto: UpdateProductDto): Promise<{success: boolean; message: string;}>{
        try{
            await this.productsRepository.updateProduct(productId, updateProductDto);
            return {
                success: true,
                message: 'Your product is updated successfully'
            }
        }catch(error){
            console.error('Error in updating the product: ', error.message);
            return {
                success: false,
                message: error.message
            }
        }
    }
    
    async deleteProduct(productId: string): Promise<{success: boolean; message: string; }>{
        try{
            const res = await this.productsRepository.deleteProduct(productId);
            if(res){
                return {
                    success: true,
                    message: 'Product is deleted successfully'
                }
            }
            return{
                success: false,
                message: 'Failed to delete product'
            }
        }catch(error){
            console.error('Error in deleting a product: ', error.message);
            return{
                success: false,
                message: error.message
            }
        }
    }
    
    async getAllProducts(): Promise<{success: boolean; message: string; products: any}> {
        try{
            const products = await this.productsRepository.getAllProducts();
            return {
                success: true,
                message: 'All Products are fetched',
                products: products
            }
        }catch(error){
            return{
                success: false,
                message: 'Failed to fetch All the products',
                products: null
            }
        }
    }
    
    async getProductsByVendorStore(vendorStoreId: string): Promise<{success: boolean; message: string; products: Products[] | null}> {
        try{
            const products = await this.productsRepository.getProductsByVendorStore(vendorStoreId);
            return {
                success: true,
                message: 'All Products are fetched',
                products: products
            }
        }catch(error){
            console.error('Error in fetching all products:', error.message);
            throw new InternalServerErrorException('Error in fetching all products');
        }
    }

    async getAllProductsForCustomers(): Promise<{success: boolean; message: string; products: any}>{
        try{
            const products = await this.productsRepository.getAllProductsForCustomers();
            return{
                success: true,
                message: 'Start Shopping',
                products: products
            } 
        }catch(error){
            console.error('Error in fetching the products for the customers: ', error.message);
            return{
                success: false,
                message: 'Failed to fetch All the products',
                products: null
            }
        }
    }
}