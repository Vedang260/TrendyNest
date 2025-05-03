import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { VendorOrders } from "./vendorOrders.entity";

@Entity({ name: 'revenue' })
export class Revenue{
    @PrimaryGeneratedColumn('uuid')
    revenueId: string;
    
    @Column('uuid')
    vendorOrderId: string;
    
    @Column()
    total: number;

    @Column()
    commissionPercent: number;

    @Column()
    platformEarnings: number;

    @Column()
    vendorEarnings: number;

    @OneToOne(() => VendorOrders)
    @JoinColumn({ name: 'vendorOrderId' })
    vendorOrders: VendorOrders;

    @CreateDateColumn()
    createdAt: Date;
}