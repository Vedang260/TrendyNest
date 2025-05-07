import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CreateCouponDto } from "../dtos/createCoupon.dto";
import { Coupon } from "../entities/coupon.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CouponRepository{
    constructor(
        @InjectRepository(Coupon)
        private readonly couponRepository: Repository<Coupon>,
        private readonly dataSource: DataSource
    ) {}

    async getBirthdayCustomers(){
        try{
            const result = await this.dataSource.query(`
                SELECT 
                    u.id AS "customerId",
                    u.email,
                    COALESCE(SUM(o."totalAmount"), 0) AS "totalPurchase"
                FROM users u
                LEFT JOIN orders o 
                ON u.id = o."customerId"
                    AND o."createdAt" >= CURRENT_DATE - INTERVAL '1 year'
                WHERE u.role = 'customer'
                    AND EXTRACT(MONTH FROM u.dob) = EXTRACT(MONTH FROM CURRENT_DATE)
                    AND EXTRACT(DAY FROM u.dob) = EXTRACT(DAY FROM CURRENT_DATE)
                GROUP BY u.id, u.email;    
            `);
            return result;
        }catch(error){
            console.error('Error in fetching customers total purchase');
        
        }
    }

    async createCoupons(createCouponDto: CreateCouponDto[]): Promise<Coupon[] | null>{
        try{
            return await this.couponRepository.save(createCouponDto);
        }catch(error){
            console.error('Error in creating Coupons: ', error.message);
            throw new InternalServerErrorException('Error in creating coupons');
        }
    }
}