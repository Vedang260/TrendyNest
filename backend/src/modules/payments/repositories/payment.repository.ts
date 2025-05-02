import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from '../entities/products.entity';
import { CreateProductDto } from '../dtos/CreateProduct.dto';
import { UpdateProductDto } from '../dtos/updateProduct.dto';
import { ProductStatus } from 'src/common/enums/productStatus.enums';
import { Payments } from '../entities/payment.entity';

@Injectable()
export class PaymentRepository{
    constructor(
        @InjectRepository(Payments)
        private readonly paymentRepository: Repository<Payments>,
    ) {}        

    // creates new Payment entry
    async createNewPayment(createPaymentDto: Partial<CreatePaymentDto>): Promise<Payments> {
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
}