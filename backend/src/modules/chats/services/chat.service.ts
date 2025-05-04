// src/chat/services/chat.service.ts
import { Injectable } from '@nestjs/common';
import { OrderService } from '../../orders/services/orders.service';
import { ProductService } from '../../products/services/products.service';
import { OrderItemsService } from 'src/modules/orders/services/orderItems.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderItemsService: OrderItemsService,
    private readonly productService: ProductService,
  ) {}

  async handleInquiry(message: string): Promise<string> {
    // Input validation
    if (!message || typeof message !== 'string') {
      return 'Please provide a valid message';
    }
  
    try {
      // Normalize message for easier matching
      const normalizedMsg = message.toLowerCase().trim();
  
      // Regex to detect Order ID in UUID format
      const orderIdMatch = normalizedMsg.match(/(?:ord-)([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/i);
  
      // If message includes a valid Order ID
      if (orderIdMatch) {
        const orderId = orderIdMatch[1]; // Ensure consistent format
  
        try {
          // Check if order exists
          const order = await this.orderService.getOrderById(orderId);
  
          if (!order?.success) {
            return `❌ Sorry, we couldn't find order ${orderId}. Please verify the ID.`;
          }
  
          // Fetch order items
          const response = await this.orderItemsService.fetchOrderItems(orderId);
          
          if (!response?.success) {
            return `❌ Couldn't retrieve items for order ${orderId}.`;
          }
  
          // Format the response
          if (response?.orderItems) {
            const formattedItems = response.orderItems.map(item => 
              `🟪 ${item.productName} x${item.quantity} - ₹${item.price} [${item.status}]`
            ).join('\n');
  
            return `🔎 Order ${orderId}:
  📦 Status: ${order.order?.status || "Processing"}
  🛒 Items:
  ${formattedItems}`;
          }
  
          return `🔎 Found order ${orderId} but no items available.`;
        } catch (error) {
          console.error(`Order lookup failed for ${orderId}:`, error);
          return `❌ Error retrieving order ${orderId}. Please try again later.`;
        }
      }
  
      // Check for order-related queries
      if (normalizedMsg.includes('order') || normalizedMsg.includes('track')) {
        return "📦 Please provide your Order ID (format: ORD-XXXXXX)";
      }
      
      // Check for product-related queries
      if (normalizedMsg.includes('product') || normalizedMsg.includes('price')) {
        return "🛍️ Please provide the product name or ID you're inquiring about";
      }
      
      // Default response
      return `🙏 Welcome to TrendyNest! I can help with:
  📦 Order tracking - provide your Order ID
  🛍️ Product info - ask about a specific product`;
    } catch (error) {
      console.error('Error handling inquiry:', error);
      return "⚠️ Sorry, I encountered an error. Please try again.";
    }
  }

  private async handleProductInquiry(message: string): Promise<string> {
    // Extract product name/ID (e.g., "Tell me about iPhone 15")
    const productKeywords = message.toLowerCase().split(' ').filter(word => 
      !['product', 'price', 'details', 'about'].includes(word)
    );
    
    // const productName = productKeywords.join(' ');
    // const product = await this.productsService.search(productName);
    
    // if (!product) return `Product not found. Try another keyword.`;
    // return `${product.name} costs $${product.price}. Stock: ${product.stock}.`;
    return "";
  }
}