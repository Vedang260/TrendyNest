import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CouponRepository } from '../repositories/coupon.repository';
import { CreateCouponDto } from '../dtos/createCoupon.dto';
import { discountType } from 'src/common/enums/discountType.enums';
import { couponType } from 'src/common/enums/couponType.enums';

@Injectable()
export class CouponService{
    constructor(
        private readonly couponRepository: CouponRepository
    ) {}

    // Runs every Day at 12:00 am
    @Cron('0 0 * * *')
    async generateBirthdayCoupons() {
        try{
            const birthdayCustomers = await this.couponRepository.getBirthdayCustomers();
            const couponsToInsert = birthdayCustomers.map(async customer =>
                await this.generatePersonalizedBirthdayCoupon(customer.customerId, Number(customer.totalPurchase))
            );
              
              // Save all coupons to DB (bulk insert recommended)
            await this.couponRepository.createCoupons(couponsToInsert); 
        }catch(error){

        }
    }

    private async generatePersonalizedBirthdayCoupon(customerId, totalPurchase){
        try{
            let discount = 10;
            let minPurchase = 500;

            if (totalPurchase >= 20000) {
                discount = 40;
                minPurchase = 2000;
            } else if (totalPurchase >= 10000) {
                discount = 30;
                minPurchase = 1500;
            } else if (totalPurchase >= 5000) {
                discount = 20;
                minPurchase = 1000;
            }
            
            const validFromDate = new Date();
            const validToDate = new Date(validFromDate);
            validToDate.setDate(validToDate.getDate() + 3);
            
            const createCouponDto: CreateCouponDto = {
                code: "HDB",
                discountType: discountType.PERCENTAGE,
                discountValue: discount,
                minPurchaseAmount: minPurchase,
                validFrom: validFromDate,
                validTo: validToDate,
                couponType: couponType.BIRTHDAY
            }
            return createCouponDto;
        }catch(error){
            console.error('Error in finding Birthday Discounts: ', error.message);
        }
    }
}