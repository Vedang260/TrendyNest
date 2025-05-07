import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Cron } from '@nestjs/schedule';
import { UsersService } from 'src/modules/users/services/users.service';
import { CouponRepository } from '../repositories/coupon.repository';
import { CreateCouponDto } from '../dtos/createCoupon.dto';

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
            await this.couponRepository.save(couponsToInsert); 
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
            
            const createCouponDto: CreateCouponDto = {

            }
        }catch(error){
            console.error('Error in finding Birthday Discounts: ', error.message);
        }
    }
}