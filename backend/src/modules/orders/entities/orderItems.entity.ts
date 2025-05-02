import { OrderItemStatus } from "src/common/enums/orderItemStatus.enums";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'order_items'})
export class OrderItems{
    @PrimaryGeneratedColumn('uuid')
    orderItemsId: string;

    @Column('uuid')
    orderId: string;
    
    @Column('uuid')
    productId: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column({ type: 'enum', enum: OrderItemStatus, default: OrderItemStatus.PENDING})
    status: OrderItemStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}