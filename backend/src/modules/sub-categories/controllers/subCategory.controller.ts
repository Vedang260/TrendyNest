import { Controller, Get, Param, Delete, UseGuards, ParseIntPipe, Post, Put, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt_auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../common/enums/roles.enums';
import { SubCategoryService } from '../services/subCategory.service';
import { CreateSubCategoryDto } from '../dtos/createSubCategory.dto';
import { UpdateSubCategoryDto } from '../dtos/updateSubCategory.dto';

@Controller('sub-categories')
@UseGuards(JwtAuthGuard)
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get(':categoryId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async findSubCtegoriesByCategory(@Param('categoryId') categoryId: string){
    return this.subCategoryService.getSubCategoriesByCategory(categoryId);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.VENDOR)
  async findAll(){
    return this.subCategoryService.getAllSubCategories();
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteCategory(@Param('id') id: string){
    return this.subCategoryService.deleteSubCategory(id);
  }

  @Post('create')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async createSubCategory(@Body('subCategory') createSubCategoryDto: CreateSubCategoryDto){
    return this.subCategoryService.createSubCategory(createSubCategoryDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateSubCategory(@Param('id') id: string, @Body('subCategory') updateSubCategoryDto: UpdateSubCategoryDto){
    return this.subCategoryService.updateSubCategory(id, updateSubCategoryDto);
  }
} 