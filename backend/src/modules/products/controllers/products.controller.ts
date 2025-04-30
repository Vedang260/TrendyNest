import { Controller, Get, Param, Delete, UseGuards, ParseIntPipe, Post, Put, Body, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt_auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { ProductService } from '../services/products.service';
import { UploadService } from 'src/utils/uploads/uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserRole } from 'src/common/enums/roles.enums';
import { CreateProductStockDto } from '../dtos/createProductStock.dto';
import { CreateProductDto } from '../dtos/CreateProduct.dto';
import { UpdateProductDto } from '../dtos/updateProduct.dto';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(
    private readonly productService: ProductService,
    private uploadService: UploadService
  ) {}

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  async uploadImage(@UploadedFile() file: Express.Multer.File){
      return await this.uploadService.uploadFile(file);
  }

  @Get('/customers')
  async getProductsForCustomers(){
    return this.productService.getAllProductsForCustomers();
  }

  @Get('/:vendorStoreId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  async getProductsByVendorId(@Param('id') id: string){
    return this.productService.getProductsByVendorStore(id);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.VENDOR)
  async findAll(){
    return this.productService.getAllProducts();
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  async deleteProduct(@Param('id') id: string){
    return this.productService.deleteProduct(id);
  }

  @Post('create')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  async createProduct(@Body('product') createProductDto: CreateProductDto, @Body('productStock') createProductStockDto: Partial<CreateProductStockDto>){
    return this.productService.createNewProduct(createProductDto, createProductStockDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  async updateProduct(@Param('id') id: string, @Body('product') updateProductDto: UpdateProductDto){
    return this.productService.updateProduct(id, updateProductDto);
  }
} 