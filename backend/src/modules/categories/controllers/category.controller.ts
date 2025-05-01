import { Controller, Get, Param, Delete, UseGuards, ParseIntPipe, Post, Put, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt_auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../common/enums/roles.enums';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dtos/createCategory.dto';
import { UpdateCategoryDto } from '../dtos/updateCategory.dto';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.VENDOR)
  async findAll(){
    return this.categoryService.getAllCategories();
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteCategory(@Param('id') id: string){
    return this.categoryService.deleteCategory(id);
  }

  @Post('create')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async createCategory(@Body('category') createCategoryDto: CreateCategoryDto){
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateCategory(@Param('id') id: string, @Body('category') updateCategoryDto: UpdateCategoryDto){
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }
} 