import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { constant } from '../../../constants';
import { Trip } from '../../trip/entities/trip.entity';
import { DocumentsStatus } from '../documentStatus.enum';
import { Car } from './car.entity';

@Entity()
export class Driver {
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

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Trip, (driver) => Driver)
  trips: Trip[];

  //TODO default false!!!, for testing
  @Column({ default: true })
  isVerified: boolean;

  @Column('text', { array: true, default: () => 'array[]::text[]' })
  documents: string[];

  @Column({ default: DocumentsStatus.NOT_PROVIDED })
  documentsStatus: string;

  //TODO default false
  @Column({ default: true })
  isOnline: boolean;

  @OneToOne(() => Car, { onUpdate: 'CASCADE' })
  @JoinColumn()
  car: Car;
}
