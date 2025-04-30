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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsersModule,
    CategoryModule,
    SubCategoryModule,
    VendorStoreModule,
    ProductsModule,
    CartItemsModule,
    DashboardModule,
    UploadModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes(
      { path: 'users', method: RequestMethod.ALL },
      { path: 'categories', method: RequestMethod.ALL },
      { path: 'sub-categories', method: RequestMethod.ALL },
      { path: 'vendor-stores', method: RequestMethod.ALL },
      { path: 'products', method: RequestMethod.ALL },
      { path: 'cart-items', method: RequestMethod.ALL },
      { path: 'dashboard', method: RequestMethod.ALL }
    );
  }
}
