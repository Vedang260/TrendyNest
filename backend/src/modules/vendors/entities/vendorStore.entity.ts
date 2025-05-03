import { StoreStatus } from "src/common/enums/storeStatus.enums";
import { User } from "src/modules/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Addresses } from "./address.entity";
import { Categories } from "src/modules/categories/entities/category.entity";
import { Products } from "src/modules/products/entities/products.entity";
import { VendorOrders } from "src/modules/orders/entities/vendorOrders.entity";

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

    // Relationship: Many VendorStores belong to one Vendor
    @ManyToOne(() => User, (vendor) => vendor.vendorStores)
    @JoinColumn({ name: 'vendorId' })
    vendor: User;

    // Relationship: Many VendorStores belong to one Address
    @ManyToOne(() => Addresses, (address) => address.vendorStores)
    @JoinColumn({ name: 'addressId' })
    address: Addresses;

    // Relationship: Many VendorStores belong to one Category
    @ManyToOne(() => Categories, (category) => category.vendorStores)
    @JoinColumn({ name: 'categoryId' })
    category: Categories;
    
    @OneToMany(() => Products, (product) => product.vendorStores)
    products: Products[];

    @OneToMany(() => VendorOrders, (vendorOrder) => vendorOrder.vendorStores)
    vendorOrders: VendorOrders[];

    @Column()
    store_name: string;

    @Column()
    store_description: string;

    @Column()
    business_email: string;

    @Column()
    business_phone: string;

    @Column({ type: 'enum', enum: StoreStatus, default: StoreStatus.PENDING})
    status: StoreStatus

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}