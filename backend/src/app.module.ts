import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/modules/users.module';
import { AuthModule } from './modules/auth/module/auth.module';
import { typeOrmConfig } from './config/database.config';
import { AuthMiddleware } from './modules/auth/middlewares/auth.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './modules/categories/module/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsersModule,
    CategoryModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes(
      { path: 'users', method: RequestMethod.ALL },
      { path: 'categories', method: RequestMethod.ALL }
    );
  }
}
