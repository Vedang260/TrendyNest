import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorStores } from '../entities/vendorStore.entity';
import { Addresses } from '../entities/address.entity';
import { VendorStoreController } from '../controllers/vendorStore.controller';
import { VendorStoreService } from '../services/vendorStore.service';
import { VendorStoreRepository } from '../repositories/vendorStore.repository';
import { AddressesRepository } from '../repositories/addresses.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VendorStores, Addresses])],
  controllers: [VendorStoreController],
  providers: [VendorStoreService, VendorStoreRepository, AddressesRepository],
  exports: [VendorStoreService, VendorStoreRepository, AddressesRepository],
})
export class VendorStoreModule {} 