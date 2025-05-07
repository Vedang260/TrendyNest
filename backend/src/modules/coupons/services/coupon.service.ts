import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Cron } from '@nestjs/schedule';
import { ProductService } from '../../modules/products/services/products.service';

@Injectable()
export class CouponService{
    constructor(
        private readonly productService: ProductService
    ) {}

    // Runs every Day at 12:00 am
    @Cron('0 0 * * *')
    async () {
        const result = await this.userService.getCustomersDOB();
        if(result.success){
            const products = result.products;
            for (const product of products) {
                await this.pricingQueue.add('update-price', {
                productId: product.productId,
                price: product.price,
                stock: product.stockQuantity,
                });
            }
            console.log(`✅ Enqueued ${products.length} pricing jobs.`);
        } 
    }
}