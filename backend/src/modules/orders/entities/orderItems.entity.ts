import { OrderItemStatus } from "src/common/enums/orderItemStatus.enums";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { Products } from "src/modules/products/entities/products.entity";

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

    @ManyToOne(() => Orders, (order) => order.orderItems)
    @JoinColumn({ name: 'orderId'})
    order: Orders;

    @ManyToOne(() => Products)
    @JoinColumn({ name: 'productId' })
    product: Products;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}