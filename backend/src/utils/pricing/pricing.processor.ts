import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ProductService } from '../../modules/products/services/products.service';
import { OrderItemsService } from '../../modules/orders/services/orderItems.service'; // for sales data

@Processor('pricing')
export class PricingProcessor {
  constructor(
    private readonly productService: ProductService,
    private readonly orderItemsService: OrderItemsService
  ) {}

  @Process('update-price')
  async handlePriceUpdate(job: Job) {
    const { productId, price, stock } = job.data;

    const result = await this.orderItemsService.getSalesHistoryOfProduct(productId);

    if(result.success){
        const predictedPrice = await this.getPredictedPrice(price, result.monthlySales, stock);

        await this.productService.updateProduct(productId, {price: predictedPrice});
        
        console.log(`✅ [${productId}] Price updated to ₹${predictedPrice}`);
    }
    
  }

  private async getPredictedPrice(price: number, monthlySales: number[], stock: number): Promise<number> {
    try {
        const n = monthlySales.length;
        if (n < 2) return price;
      
        // Demand trend (slope)
        const demandGrowthRate = (monthlySales[n - 1] - monthlySales[0]) / monthlySales[0];
      
        // Sales volatility (std deviation)
        const avgSales = monthlySales.reduce((a, b) => a + b, 0) / n;
        const volatility = Math.sqrt(monthlySales.map(x => Math.pow(x - avgSales, 2)).reduce((a, b) => a + b) / n);
      
        // Stock factor
        const scarcityFactor = stock < 10 ? 0.1 : stock < 50 ? 0.05 : 0;
      
        // Final multiplier logic
        let multiplier = 1;
      
        if (demandGrowthRate > 0.5) multiplier += 0.15; // strong growth
        else if (demandGrowthRate > 0.2) multiplier += 0.1;
        else if (demandGrowthRate < -0.2) multiplier -= 0.1;
      
        if (volatility > 0.25 * avgSales) multiplier -= 0.05; // penalize unstable sales
      
        multiplier += scarcityFactor;
      
        // Apply bounds
        if (multiplier < 0.8) multiplier = 0.8;
        if (multiplier > 1.5) multiplier = 1.5;
      
        const predictedPrice = parseFloat((price * multiplier).toFixed(2));
        const roundedPrice = Math.round(predictedPrice); 
        return roundedPrice;
    } catch (error) {
      console.error('❌ AI API failed:', error.message);
      return price;
    }
  }
}
