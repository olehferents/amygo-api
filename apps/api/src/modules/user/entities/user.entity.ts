import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { constant } from '../../../constants';
import { PreorderTrip } from '../../preorder-trip/entities/preorderTrip.entity';
import { Item } from './item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
    default: constant.IMAGE_DEFAULT_URL,
  })
  profileImage: string;

  @Column({
    length: 15,
    unique: true,
  })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  emergencyContact: string;

  @OneToMany(() => PreorderTrip, (preorderTrip) => preorderTrip.user)
  preorderTrips: PreorderTrip[];

  @OneToMany(() => Item, (item) => item.user)
  foodOrder: Map<Item, number>;
}
