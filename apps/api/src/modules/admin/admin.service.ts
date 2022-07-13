import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { AppGateway } from '../../app.gateway';
import { AdminNotificationDto } from './dto/adminNotification.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { constant } from '../../constants';

@Injectable()
export class AdminService {
  constructor(
    private readonly appGateway: AppGateway,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  adminNotification(notification: AdminNotificationDto, role: string) {
    let { when } = notification;
    console.log(role, 'role');

    if (!when) {
      if (role === 'users') {
        this.appGateway.adminNotifyAllUsers(notification);
      }
      if (role === 'drivers') {
        this.appGateway.adminNotifyAllDrivers(notification);
      }
      if (role === 'merchants') {
        this.appGateway.adminNotifyAllMerchants(notification);
      }
      if (role === 'all') {
        this.appGateway.adminNotifyAll(notification);
      }
      return;
    }

    when = new Date(
      new Date(notification.when).getTime() - new Date(constant.UTC).getTime(),
    );

    //TODO try with @MinDate() at DTO
    if (when.getTime() < new Date().getTime()) {
      throw new PreconditionFailedException(null, 'Time should be in future');
    }

    const job = new CronJob(when, () => {
      if (role === 'users') {
        this.appGateway.adminNotifyAllUsers(notification);
      }
      if (role === 'drivers') {
        this.appGateway.adminNotifyAllDrivers(notification);
      }
      if (role === 'merchants') {
        this.appGateway.adminNotifyAllMerchants(notification);
      }
      if (role === 'all') {
        this.appGateway.adminNotifyAll(notification);
      }
      this.schedulerRegistry.deleteCronJob(when.getTime().toString());
    });

    this.schedulerRegistry.addCronJob(when.getTime().toString(), job);
    job.start();
  }
}
