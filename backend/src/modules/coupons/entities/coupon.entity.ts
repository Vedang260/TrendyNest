import { couponType } from "src/common/enums/couponType.enums";
import { discountType } from "src/common/enums/discountType.enums";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name:'coupon'})
export class Coupon{
    @PrimaryGeneratedColumn('uuid')
    couponId: string;

    @Column()
    code: string;

    @Column({ type: 'enum', enum: discountType})
    dicountType: discountType;

    @Column()
    discountValue: number;

    @Column()
    validFrom: Date;

    @Column()
    validTo: Date;

    @Column({ type: 'enum', enum: couponType})
    couponType: couponType;

    @Column({ type: 'boolean', default: true})
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}