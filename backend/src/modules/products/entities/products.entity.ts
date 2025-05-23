import { ProductStatus } from "src/common/enums/productStatus.enums";
import { SubCategories } from "src/modules/sub-categories/entities/subCategory.entity";
import { VendorStores } from "src/modules/vendors/entities/vendorStore.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductStock } from "./productStock.entity";

@Entity({ name: 'products' })
export class Products{
    @PrimaryGeneratedColumn('uuid')
    productId: string;

    @Column('uuid')
    subCategoryId: string;

    @Column('uuid')
    vendorStoreId: string;

    @ManyToOne(() => SubCategories, (subCategory) => subCategory.products, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'subCategoryId' })
    subCategory: SubCategories;
    
    @ManyToOne(() => VendorStores, (vendorStore) => vendorStore.products, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'vendorStoreId' })
    vendorStores: VendorStores;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column()
    price: number;
    
    @Column({ type: 'text' })
    description: string;

    @Column()
    mainImage: string;

    @Column({ default: false})
    bestseller: boolean;

    @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.PENDING})
    status: ProductStatus

    @OneToOne(() => ProductStock, (stock) => stock.product)
    productStock: ProductStock;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}