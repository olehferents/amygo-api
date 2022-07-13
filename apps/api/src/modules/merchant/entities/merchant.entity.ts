import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { constant } from '../../../constants';
import { DocumentsStatus } from '../../driver/documentStatus.enum';

@Entity()
export class Merchant {
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

  //TODO default false!!!, for testing
  @Column({ default: true })
  isVerified: boolean;

  @Column('text', { array: true, default: () => 'array[]::text[]' })
  documents: string[];

  @Column({ default: DocumentsStatus.NOT_PROVIDED })
  documentsStatus: string;

  @Column({ default: true })
  isOnline: boolean;
}
