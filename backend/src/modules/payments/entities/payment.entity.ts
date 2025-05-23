import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/users.entity'
import { PaymentStatus } from 'src/common/enums/paymentStatus.enums';

@Entity({ name: 'payments'})
export class Payments {
  @PrimaryGeneratedColumn('uuid')
  paymentId: string;

  @Column('uuid')
  customerId: string;

  @ManyToOne(() => User, (user) => user.payments)
  @JoinColumn({ name: 'customerId'})
  customer: User;

  @Column({ nullable: true })
  transactionId: string; // Stripe transaction ID (e.g., pi_...)

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @Column({ default: 'stripe' }) 
  paymentMethod: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}