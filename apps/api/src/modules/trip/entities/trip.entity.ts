import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Driver } from '../../driver/entities/driver.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  from: string;

  @Column()
  where: string;

  @Column()
  numberPeople: number;

  @Column()
  price: number;

  @Column('timestamp')
  date: Date;

  @ManyToOne(() => Driver, (trip) => Trip)
  driver: Driver;

  @ManyToOne(() => User, (trip) => Trip)
  user: User;
}
