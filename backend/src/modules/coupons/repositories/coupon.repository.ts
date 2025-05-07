import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class CouponRepository{
    constructor(private readonly dataSource: DataSource) {}

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
}