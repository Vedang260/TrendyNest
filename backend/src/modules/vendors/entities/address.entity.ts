import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { VendorStores } from "./vendorStore.entity";

@Entity({ name: 'addresses' })
export class Addresses{
    @PrimaryGeneratedColumn('uuid')
    addressId: string;

    @Column()
    street: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column()
    pincode: string;

    @OneToMany(() => VendorStores, (store) => store.address)
    vendorStores: VendorStores[];
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}