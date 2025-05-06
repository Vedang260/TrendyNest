import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PricingService } from './pricing.service';
import { PricingProcessor } from './pricing.processor';
import { ProductService } from '../../modules/products/services/products.service'; // adjust path
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'pricing' }),
    ScheduleModule.forRoot(),
  ],
  providers: [PricingService, PricingProcessor, ProductService],
})
export class PricingModule {}
