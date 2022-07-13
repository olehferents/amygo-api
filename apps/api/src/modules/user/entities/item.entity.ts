import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  itemImage: string;

  @Column()
  description: string;

  @OneToMany(() => User, (user) => user.foodOrder)
  user: User;
}
