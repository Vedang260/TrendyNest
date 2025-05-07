import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EMailModule } from 'src/utils/mails/email.module';
import { Coupon } from '../entities/coupon.entity';
import { CouponRepository } from '../repositories/coupon.repository';
import { CouponService } from '../services/coupon.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coupon]),
    EMailModule
  ],
  controllers: [],
  providers: [
    CouponRepository,
    CouponService
  ],
  exports: [CouponService, CouponRepository],
})
export class CouponModule {} 