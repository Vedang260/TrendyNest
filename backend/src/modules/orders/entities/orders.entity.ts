import { OrderStatus } from "src/common/enums/orderStatus.enums";
import { Payments } from "src/modules/payments/entities/payment.entity";
import { User } from "src/modules/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderItems } from "./orderItems.entity";

@Entity({ name: 'orders' })
export class Orders{
    @PrimaryGeneratedColumn('uuid')
    orderId: string;

    @Column('uuid')
    customerId: string;

    @Column('uuid')
    paymentId: string;

    @Column()
    totalAmount: number;

    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING})
    status: OrderStatus;

    @ManyToOne(() => User, (user) => user.order)
    @JoinColumn({ name: 'customerId'})
    customer: User;
    
    @OneToOne(() => Payments)
    @JoinColumn({ name: 'paymentId' })
    payment: Payments;

    @OneToMany(() => OrderItems, (orderItem) => orderItem.order)
    orderItems: OrderItems[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}