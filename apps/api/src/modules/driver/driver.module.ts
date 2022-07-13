import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Driver } from './entities/driver.entity';
import { Car } from './entities/car.entity';
import { Trip } from '../trip/entities/trip.entity';
import { FileUploadService } from '../file-upload';
import { PreorderTrip } from '../preorder-trip/entities/preorderTrip.entity';
import SendNotificationService from '../preorder-trip/sendNotification.service';
import { PreorderTripService } from '../preorder-trip/preorder-trip.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { AppGateway } from '../../app.gateway';
import { Bonus } from '../user/entities/bonus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Driver, Car, Trip, PreorderTrip, Bonus])],
  controllers: [DriverController],
  providers: [
    DriverService,
    FileUploadService,
    PreorderTripService,
    SendNotificationService,
    SchedulerRegistry,
    AppGateway,
  ],
  exports: [DriverService],
})
export class DriverModule {}
