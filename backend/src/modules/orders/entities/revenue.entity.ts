import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @CreateDateColumn()
    createdAt: Date;
}