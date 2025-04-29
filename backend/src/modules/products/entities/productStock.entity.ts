import { Column, CreateDateColumn } from "typeorm";

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

    @Column({ nullable: true })
    coverImages: string[];

    @Column({ default: false})
    bestseller: boolean;

    @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.PENDING})
    status: ProductStatus

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}