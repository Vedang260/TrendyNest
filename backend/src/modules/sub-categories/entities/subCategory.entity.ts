import { Categories } from "src/modules/categories/entities/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'sub_categories' })
export class SubCategories{
    @PrimaryGeneratedColumn('uuid')
    subCategoryId: string;

    @Column()
    name: string;

    @Column('uuid')
    categoryId: string;

    @ManyToOne(() => Categories, (category) => category.subCategories, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'categoryId' })
    category: Categories;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}