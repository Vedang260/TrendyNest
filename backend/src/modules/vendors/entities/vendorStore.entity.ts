import { UserRole } from "src/common/enums/roles.enums";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'vendor_stores' })
export class VendorStores{
    @PrimaryGeneratedColumn('uuid')
    vendorStoreId: string;

    @Column('uuid')
    vendorId: string;

    @Column()
    business_email: string;

    @Column()
    
    @Column()
    business_phone: 

    @Column({ unique: true })
    email: string;

    @Column()
    

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}