import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Cron } from '@nestjs/schedule';
import { ProductService } from '../../modules/products/services/products.service';

@Injectable()
export class PricingService{
    constructor(
        private readonly productService: ProductService,
        @InjectQueue('pricing') private pricingQueue: Queue
    ) {}

    // Runs every Sunday at 1 AM
    @Cron('39 13 * * 2')
    async enqueuePriceJobs() {
        const result = await this.productService.getAllProducts();
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