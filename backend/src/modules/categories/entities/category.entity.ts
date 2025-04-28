import { SubCategories } from "src/modules/sub-categories/entities/subCategory.entity";
import { VendorStores } from "src/modules/vendors/entities/vendorStore.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'categories' })
export class Categories{
    @PrimaryGeneratedColumn('uuid')
    categoryId: string;

    @Column()
    name: string;

    @OneToMany(() => SubCategories, (subCategory) => subCategory.category)
    subCategories: SubCategories[];

    // One Category can have many vendor stores
    @OneToMany(() => VendorStores, (store) => store.category)
    vendorStores: VendorStores[];
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}