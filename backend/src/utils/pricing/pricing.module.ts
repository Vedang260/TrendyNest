import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PricingService } from './pricing.service';
import { PricingProcessor } from './pricing.processor';
import { ProductService } from '../../modules/products/services/products.service'; // adjust path
import { ScheduleModule } from '@nestjs/schedule';
import { OrderItemsModule } from 'src/modules/orders/modules/orderItems.module';
import { ProductsModule } from 'src/modules/products/module/products.module';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'pricing' }),
    ScheduleModule.forRoot(),
    OrderItemsModule,
    ProductsModule
  ],
  providers: [PricingService, PricingProcessor, ProductService],
})
export class PricingModule {}
