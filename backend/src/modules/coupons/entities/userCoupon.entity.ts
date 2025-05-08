import { Column, PrimaryGeneratedColumn } from "typeorm";

export class customerCoupon{
    @PrimaryGeneratedColumn('uuid')
    customerCouponId: string;

    @Column('uuid')
    couponId: string;

    @Column('uuid')
    customerId: string;

}