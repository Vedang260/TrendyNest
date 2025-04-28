import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from '../services/category.service';
import { CategoryRepository } from '../repositories/category.repository';
import { CategoryController } from '../controllers/category.controller';
import { Categories } from '../entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService, CategoryRepository],
})
export class CategoryModule {} 