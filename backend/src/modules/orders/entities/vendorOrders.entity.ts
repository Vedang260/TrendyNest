import { VendorOrderStatus } from "src/common/enums/vendorOrderStatus.enums";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { VendorStores } from "src/modules/vendors/entities/vendorStore.entity";

@Entity({ name: 'vendorOrders'})
export class VendorOrders{
    @PrimaryGeneratedColumn('uuid')
    vendorOrderId: string;

    @Column('uuid')
    orderId: string;

    @Column('uuid')
    vendorStoreId: string;

    @Column()
    subTotal: number;

    @Column({ type: 'enum', enum: VendorOrderStatus, default: VendorOrderStatus.PENDING})
    status: VendorOrderStatus;
    
    @OneToOne(() => Orders)
    @JoinColumn({ name: 'orderId' })
    orders: Orders;

    @OneToOne(() => VendorStores)
    @JoinColumn({ name: 'vendorStoreId'})
    vendorStores: VendorStores;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}