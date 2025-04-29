import { InjectRepository } from "@nestjs/typeorm";
import { ProductStock } from "../entities/productStock.entity";
import { Repository } from "typeorm";
import { CreateProductStockDto } from "../dtos/createProductStock.dto";
import { InternalServerErrorException } from "@nestjs/common";
import { ProductStockStatus } from "src/common/enums/productStockStatus.enums";

export class ProductStockRepository{
    constructor(
        @InjectRepository(ProductStock)
        private readonly productStockRepository: Repository<ProductStock>,
    ) {}  

    // creates new store
    async createNewProductStock(createProductStockDto: CreateProductStockDto): Promise<ProductStock> {
        try{
            const newProductStock = this.productStockRepository.create(createProductStockDto);
            return this.productStockRepository.save(newProductStock);
        }catch(error){
            console.error('Error in creating new product Stock ', error.message);
            throw new InternalServerErrorException('Error in creating new product Stock');
        }
    }

    async updateProductStock(productId: string, stockQuantity: number):  Promise<boolean>{
        try{
            const availability = stockQuantity < 10 ? ProductStockStatus.OUT_OF_STOCK : ProductStockStatus.IN_STOCK;
            const result = await this.productStockRepository.update({ productId}, { stockQuantity, availabilityStatus: availability });
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in updating product Stock ', error.message);
            throw new InternalServerErrorException('Error in updating product stock');
        }
    }
}