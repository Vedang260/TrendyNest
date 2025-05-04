import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payments } from '../entities/payment.entity';
import { PaymentsController } from '../controllers/payment.controller';
import { PaymentService } from '../services/payment.service';
import { PaymentRepository } from '../repositories/payment.repository';
import { WebhookController } from '../controllers/webhook.controller';
import { OrdersModule } from 'src/modules/orders/modules/orders.module';
import { BullModule } from '@nestjs/bull';
import { OrderItemsModule } from 'src/modules/orders/modules/orderItems.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payments]),
  OrdersModule,
  OrderItemsModule
  ],
  controllers: [PaymentsController, WebhookController],
  providers: [PaymentService, PaymentRepository ],
  exports: [PaymentService, PaymentRepository ],
})
export class PaymentModule {} 