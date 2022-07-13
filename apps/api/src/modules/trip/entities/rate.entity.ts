import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import {Trip} from './trip.entity';

@Entity()
export class Rate {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    mark: number;

    @Column('text')
    comment: string;

    @OneToOne(() => Trip)
    @JoinColumn()
    trip: Trip;
}