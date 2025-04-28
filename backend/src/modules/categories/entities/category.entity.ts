import { SubCategories } from "src/modules/sub-categories/entities/subCategory.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'categories' })
export class Categories{
    @PrimaryGeneratedColumn('uuid')
    categoryId: string;

    @Column()
    name: string;

    @OneToMany(() => SubCategories, (subCategory) => subCategory.category)
    subCategories: SubCategories[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}