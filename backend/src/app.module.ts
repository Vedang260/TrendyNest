import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/modules/users.module';
import { AuthModule } from './modules/auth/module/auth.module';
import { typeOrmConfig } from './config/database.config';
import { AuthMiddleware } from './modules/auth/middlewares/auth.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './modules/categories/module/category.module';
import { SubCategoryModule } from './modules/sub-categories/module/subCategory.module';
import { VendorStoreModule } from './modules/vendors/module/vendorStore.module';
import { UploadModule } from './utils/uploads/uploads.module';
import { ProductsModule } from './modules/products/module/products.module';
import { CartItemsModule } from './modules/cart/modules/cartItems.module';
import { DashboardModule } from './modules/dashboard/modules/dashboard.module';
import { PaymentModule } from './modules/payments/modules/payment.module';
import { bullConfig } from './config/queue.config';
import { BullModule } from '@nestjs/bull';
import { OrdersModule } from './modules/orders/modules/orders.module';
import { OrderItemsModule } from './modules/orders/modules/orderItems.module';
import { ChatModule } from './modules/chats/modules/chat.module';
import { ChatGateway } from './modules/chats/gateways/chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    BullModule.forRootAsync({                 
      useFactory: bullConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    CategoryModule,
    SubCategoryModule,
    VendorStoreModule,
    ProductsModule,
    CartItemsModule,
    DashboardModule,
    PaymentModule,
    OrdersModule,
    OrderItemsModule,
    ChatModule,
    UploadModule,
  ],
  providers: [ChatGateway]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude(
      { path: 'api/webhooks/stripe', method: RequestMethod.ALL }, // ✅ Exclude webhook
    )
    .forRoutes(
      { path: 'users', method: RequestMethod.ALL },
      { path: 'categories', method: RequestMethod.ALL },
      { path: 'sub-categories', method: RequestMethod.ALL },
      { path: 'vendor-stores', method: RequestMethod.ALL },
      { path: 'products', method: RequestMethod.ALL },
      { path: 'cart-items', method: RequestMethod.ALL },
      { path: 'dashboard', method: RequestMethod.ALL },
      { path: 'payments', method: RequestMethod.ALL },
      { path: 'orders', method: RequestMethod.ALL },
      { path: 'order-items', method: RequestMethod.ALL },
    );
  }
}
