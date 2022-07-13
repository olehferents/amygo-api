import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { constant } from '../../constants';
import { DriverService } from '../driver/driver.service';
import { AppGateway } from '../../app.gateway';
import { PreorderTripDto } from './dto/preorder-trip.dto';
import { Driver } from '../driver/entities/driver.entity';

@Injectable()
export default class SendNotificationService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly appGateway: AppGateway,
    private readonly driverService: DriverService,
  ) {}

  notifyUserOfDriverComing(
    name: string,
    time: Date,
    driver: Driver,
    userId: string,
  ) {
    const when = new Date(
      new Date(time).getTime() - constant.NOTIFY_USER_THAT_DRIVER_COMING,
    );
    name += Date.now();

    const job = new CronJob(when, () => {
      this.appGateway.notifyUserOfDriverComing(driver, null, userId);
      this.schedulerRegistry.deleteCronJob(name);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();
  }

  notifyNearDrivers(
    preorderTripDto: PreorderTripDto,
    name: string,
    time: Date,
  ) {
    name += Date.now();
    const { when, from, where, numberOfPeople } = preorderTripDto;

    const whenNotify = new Date(
      new Date(time).getTime() - constant.NOTIFY_DRIVERS_OF_PREORDER,
    );

    const job = new CronJob(whenNotify, async () => {
      //TODO find closest drivers
      const driversIds = await this.driverService.findVerifiedOnlineDrivers();

      driversIds.forEach((driverId) =>
        this.appGateway.notifyDrivers(
          {
            message: 'There is new order near you',
            when,
            from,
            where,
            numberOfPeople,
          },
          null,
          driverId,
        ),
      );

      this.schedulerRegistry.deleteCronJob(name);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();
  }
}
