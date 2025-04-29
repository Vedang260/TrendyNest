import { User } from "src/modules/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CartItems } from "./cartItems.entity";

@Entity({ name: 'cart' })
export class Cart{
    @PrimaryGeneratedColumn('uuid')
    cartId: string;

    @Column('uuid')
    customerId: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'customerId' })
    customer: User;
    
    @OneToMany(() => CartItems, (cartItem) => cartItem.cart, {
        cascade: true,
    })
    cartItems: CartItems[];
      
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}