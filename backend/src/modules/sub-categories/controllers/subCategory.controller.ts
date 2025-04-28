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

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async findSubCtegoriesByCategory(@Param('id') id: string){
    return this.subCategoryService.getSubCategoriesByCategory(id);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
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
  async updateSubCategory(@Param('id') id: string, @Body('subcategory') updateSubCategoryDto: UpdateSubCategoryDto){
    return this.subCategoryService.updateSubCategory(id, updateSubCategoryDto);
  }
} 