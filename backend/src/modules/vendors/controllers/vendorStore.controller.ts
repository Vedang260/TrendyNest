import { Controller, Get, Param, Delete, UseGuards, ParseIntPipe, Post, Put, Body, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt_auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../common/enums/roles.enums';
import { VendorStoreService } from '../services/vendorStore.service';
import { CreateVendorStoreDto } from '../dtos/createVendorStore.dto';
import { CreateAddressDto } from '../dtos/createAddress.dto';
import { UpdateVendorStoreDto } from '../dtos/updateVendorStore.dto';

@Controller('vendor-stores')
@UseGuards(JwtAuthGuard)
export class VendorStoreController {
  constructor(private readonly vendorStoreService: VendorStoreService) {}

  @Get('/vendorId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  async getVendorStoresByVendorId(@Req() req: Request){
    return this.vendorStoreService.getVendorStoreByVendorId(req['user'].userId);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAll(){
    return this.vendorStoreService.getAllVendorStores();
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  async deleteVendorStore(@Param('id') id: string){
    return this.vendorStoreService.deleteVendorStore(id);
  }

  @Post('create')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  async createVendorStore(@Req() req: Request,@Body('vendorStore') createVendorStoreDto: Partial<CreateVendorStoreDto>, @Body('address') addressDto: CreateAddressDto){
    createVendorStoreDto.vendorId = req['user'].userId;
    return this.vendorStoreService.createVendorStore(createVendorStoreDto, addressDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  async updateSubCategory(@Param('id') id: string, @Body('vendorStore') updateVendorStoreDto: UpdateVendorStoreDto){
    return this.vendorStoreService.updateVendorStore(id, updateVendorStoreDto);
  }
} 