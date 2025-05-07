import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Cron } from '@nestjs/schedule';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class CouponService{
    constructor(
        private readonly usersService: UsersService
    ) {}

    // Runs every Day at 12:00 am
    @Cron('0 0 * * *')
    async generateBirthdayCoupons() {
        try{
            const result = await this.usersService.findCustomersDOB();
            if(result.success){
                const customers = result?.customers;
                if(customers){

                }
            }
        }catch(error){

        }
    }

    private async generatePersonalizedBirthdayCoupons(){
        try{

        }catch(error){
            console.error('Error in finding Birthday Discounts: ', error.message);
        }
    }
}