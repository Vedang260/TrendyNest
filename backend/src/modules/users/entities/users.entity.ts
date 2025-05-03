import { UserRole } from "src/common/enums/roles.enums";
import { Notifications } from "src/modules/notifications/entities/notification.entity";
import { Orders } from "src/modules/orders/entities/orders.entity";
import { Payments } from "src/modules/payments/entities/payment.entity";
import { VendorStores } from "src/modules/vendors/entities/vendorStore.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'users' })
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
    
    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;

    @OneToMany(() => VendorStores, (store) => store.vendor)
    vendorStores: VendorStores[];
    
    @OneToMany(() => Payments, (payment) => payment.customer)
    payments: Payments[]
    
    @OneToMany(() => Notifications, (notification) => notification.user)
    notification: Notifications[];
    
    @OneToMany(() => Orders, (order) => order.customer)
    order: Orders[];
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}