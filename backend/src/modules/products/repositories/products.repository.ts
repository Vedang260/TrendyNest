import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from '../entities/products.entity';
import { CreateProductDto } from '../dtos/CreateProduct.dto';
import { UpdateProductDto } from '../dtos/updateProduct.dto';
import { ProductStatus } from 'src/common/enums/productStatus.enums';

@Injectable()
export class ProductsRepository{
    constructor(
        @InjectRepository(Products)
        private readonly productsRepository: Repository<Products>,
    ) {}        

    // creates new store
    async createNewProduct(createProductDto: Partial<CreateProductDto>): Promise<Products> {
        try{
            const newProduct = this.productsRepository.create(createProductDto);
            return this.productsRepository.save(newProduct);
        }catch(error){
            console.error('Error in creating new product ', error.message);
            throw new InternalServerErrorException('Error in creating new product');
        }
    }

    // deletes a product
    async deleteProduct(productId: string): Promise<boolean> {
        try{
            const result = await this.productsRepository.delete(productId);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in deleting a product ', error.message);
            throw new InternalServerErrorException('Error in deleting a product');
        }
    }

    // update product
    async updateProduct(productId: string, updateProductDto: UpdateProductDto): Promise<boolean>{
        try{
            const result = await this.productsRepository.update({ productId}, updateProductDto);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in updating a product', error.message);
            throw new InternalServerErrorException('Error in updating a product');
        }
    }

    // get all products by Vendor Store
    async getProductsByVendorStore(vendorStoreId: string): Promise<Products[]>{
        try{
            return await this.productsRepository.find({ 
                where: {vendorStoreId},
                relations: ['product_stock']
            });
        }catch(error){
            console.error('Error in fetching all products of vendor store', error.message);
            throw new InternalServerErrorException('Error in fetching all products of vendor store');
        }
    }

    async getAllProducts(){
        try{
            const products = await this.productsRepository.find({
                relations: ['subCategory', 'productStock'], 
            });
            return products.map((product) => ({
                productId: product.productId,
                subCategoryId: product.subCategoryId,
                name: product.name,
                brand: product.brand,
                price: product.price,
                description: product.description,
                mainImage: product.mainImage,
                bestseller: product.bestseller,
                status: product.status,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
                subCategoryName: product.subCategory?.name,
                stockQuantity: product.productStock?.stockQuantity, 
                availabilityStatus: product.productStock?.availabilityStatus
            }));
        }catch(error){
            console.error('Error in fetching all products', error.message);
            throw new InternalServerErrorException('Error in fetching all products');
        }
    }

    async getAllProductsForCustomers(){
        try{
            const products = await this.productsRepository.find({
                relations: ['subCategory', 'productStock'],
                where: {status: ProductStatus.APPROVED} 
            });
            return products.map((product) => ({
                productId: product.productId,
                subCategoryId: product.subCategoryId,
                name: product.name,
                brand: product.brand,
                price: product.price,
                description: product.description,
                mainImage: product.mainImage,
                bestseller: product.bestseller,
                subCategoryName: product.subCategory?.name, 
                availabilityStatus: product.productStock?.availabilityStatus
            }));
        }catch(error){
            console.error('Error in fetching all products for the customers', error.message);
            throw new InternalServerErrorException('Error in fetching all products for the customers');       
        }
    }
}