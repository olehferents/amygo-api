import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { PreorderTripStatus } from '../enum/PreorderTripStatus.enum';
import { Driver } from '../../driver/entities/driver.entity';

@Entity()
export class PreorderTrip {
  @PrimaryGeneratedColumn('uuid')
  preorderTripId: string;

  @Column()
  when: Date;

  @Column()
  where: string;

  @Column()
  from: string;

  @Column()
  numberOfPeople: number;

  @ManyToOne(() => User, (user) => user.preorderTrips)
  user: User;

  @Column()
  public userId: string;

  @Column('jsonb', { nullable: true, default: () => "'[]'" })
  drivers: Driver[];

  @Column({ default: PreorderTripStatus.NO_OFFERING })
  statusOfPreorderTrip: string;

  @CreateDateColumn()
  orderedAt: string;
}
