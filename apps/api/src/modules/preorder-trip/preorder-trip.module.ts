import { Module } from '@nestjs/common';
import { PreorderTripController } from './preorder-trip.controller';
import { PreorderTripService } from './preorder-trip.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Driver } from '../driver/entities/driver.entity';
import { PreorderTrip } from './entities/preorderTrip.entity';
import { Car } from '../driver/entities/car.entity';
import { DriverService } from '../driver/driver.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import SendNotificationService from './sendNotification.service';
import { AppGateway } from '../../app.gateway';
import { Bonus } from '../user/entities/bonus.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User, Bonus, Driver, Car, PreorderTrip])],
  controllers: [PreorderTripController],
  providers: [
    PreorderTripService,
    UserService,
    SendNotificationService,
    DriverService,
    SchedulerRegistry,
    AppGateway,
  ],
  exports: [SendNotificationService],
})
export class PreorderTripModule {}
