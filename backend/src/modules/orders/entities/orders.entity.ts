import { OrderStatus } from "src/common/enums/orderStatus.enums";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}