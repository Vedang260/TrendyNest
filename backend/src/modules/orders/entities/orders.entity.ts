import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'orders' })
export class Orders{
    @PrimaryGeneratedColumn('uuid')
    orderId: string;

    @Column('uuid')
    customerId: string

    @Column('uuid')
    paymentId: string

    @Column()
    totalAmount: number
    
}