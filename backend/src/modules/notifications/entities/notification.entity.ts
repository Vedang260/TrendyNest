import { User } from "src/modules/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'notifications'})
export class Notifications{
    @PrimaryGeneratedColumn('uuid')
    notificationId: string;

    @Column('uuid')
    userId: string;

    @ManyToOne(() => User, (user) => user.payments)
    @JoinColumn({ name: 'userId'})
    user: User;

    @Column()
    title: string;

    @Column()
    message: string;

    @Column({ type: 'boolean', default: false })
    isRead: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}