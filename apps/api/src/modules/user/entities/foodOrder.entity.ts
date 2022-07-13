import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class FoodOrder {
  @PrimaryGeneratedColumn('uuid')
  foodOrderId: string;

  @ManyToOne(() => User, (user) => user.foodOrder)
  user: User;

  @CreateDateColumn()
  orderedAt: string;

  @Column()
  totalPrice: number;
}
