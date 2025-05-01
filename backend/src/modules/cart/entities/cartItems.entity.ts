import { User } from "src/modules/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Products } from "src/modules/products/entities/products.entity";

@Entity({ name: 'cart_items' })
export class CartItems{
    @PrimaryGeneratedColumn('uuid')
    cartItemsId: string;

    @Column('uuid')
    cartId: string;

    @Column('uuid')
    productId: string;

    @Column()
    quantity: number;
        
    @ManyToOne(() => Cart, (cart) => cart.cartItems, { onDelete: 'CASCADE' })
    cart: Cart;
    
    @OneToOne(()=>Products)
    @JoinColumn({ name: 'productId'})
    product: Products;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}