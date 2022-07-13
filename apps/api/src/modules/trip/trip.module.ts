import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { User } from '../user/entities/user.entity';
import { Driver } from '../driver/entities/driver.entity';
import { Car } from '../driver/entities/car.entity';
import { Rate } from './entities/rate.entity';
import { DriverModule } from '../driver/driver.module';
import { UserService } from '../user/user.service';
import { Bonus } from '../user/entities/bonus.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Car, Driver, Trip, Rate, Bonus]), DriverModule],
    providers: [TripService, UserService],
    controllers: [TripController]
})

export class TripModule {}