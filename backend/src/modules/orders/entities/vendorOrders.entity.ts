import { VendorOrderStatus } from "src/common/enums/vendorOrderStatus.enums";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}