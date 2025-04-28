import { UserRole } from "src/common/enums/roles.enums";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'vendor_stores' })
export class VendorStores{
    @PrimaryGeneratedColumn('uuid')
    vendorStoreId: string;

    @Column('uuid')
    vendorId: string;

    @Column('uuid')
    addressId: string;

    @Column('uuid')
    categoryId: string;

    @Column()
    store_name: string;

    @Column()
    store_description: string;

    @Column()
    business_email: string;

    @Column()
    business_phone: string;

    @Column()
    status: 
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}