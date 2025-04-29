import { ProductStockStatus } from "src/common/enums/productStockStatus.enums";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Products } from "./products.entity";

@Entity({ name: 'products_stock' })
export class ProductStock{
    @PrimaryGeneratedColumn('uuid')
    productStockId: string;

    @Column('uuid')
    productId: string;

    @OneToOne(() => Products) 
    @JoinColumn({ name: 'productId' }) 
    product: Products

    @Column()
    stockQuantity: number;

    @Column({ type: 'enum', enum: ProductStockStatus, default: ProductStockStatus.IN_STOCK })
    availabilityStatus: ProductStockStatus

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}