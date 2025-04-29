import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadModule } from 'src/utils/uploads/uploads.module';
import { ProductsController } from '../controllers/products.controller';
import { ProductsRepository } from '../repositories/products.repository';
import { ProductService } from '../services/products.service';
import { ProductStock } from '../entities/productStock.entity';
import { Products } from '../entities/products.entity';
import { ProductStockRepository } from '../repositories/productStock.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products, ProductStock]),
    UploadModule,
  ],
  controllers: [ProductsController],
  providers: [
    ProductService,
    ProductsRepository,
    ProductStockRepository
  ],
  exports: [ProductService, ProductsRepository, ProductStockRepository],
})
export class ProductsModule {} 