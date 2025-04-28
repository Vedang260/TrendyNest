import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoryService } from '../services/subCategory.service';
import { SubCategoryRepository } from '../repositories/subCategory.repository';
import { SubCategoryController } from '../controllers/subCategory.controller';
import { SubCategories } from '../entities/subCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategories])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService, SubCategoryRepository],
  exports: [SubCategoryService, SubCategoryRepository],
})
export class SubCategoryModule {} 