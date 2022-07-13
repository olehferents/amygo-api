import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Driver } from './driver.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column({
    unique: true,
  })
  carNumber: string;

  @Column()
  carType: string;

  @OneToOne(() => Driver, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn()
  driver: Driver;
}
