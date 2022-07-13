import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Bonus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
