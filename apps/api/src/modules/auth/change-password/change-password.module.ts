import { Module } from '@nestjs/common';
import { ChangePasswordController } from './change-password.controller';
import { ChangePasswordService } from './change-password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { Driver } from '../../driver/entities/driver.entity';
import { UserService } from '../../user/user.service';
import { UserModule } from '../../user/user.module';
import { DriverService } from '../../driver/driver.service';
import { Car } from '../../driver/entities/car.entity';
import { Trip } from '../../trip/entities/trip.entity';
import { Merchant } from '../../merchant/entities/merchant.entity';
import { MerchantService } from '../../merchant/merchant.service';
import { Bonus } from '../../user/entities/bonus.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Driver, Car, Trip, Merchant, Bonus]),
    UserModule,
  ],
  controllers: [ChangePasswordController],
  providers: [
    ChangePasswordService,
    UserService,
    DriverService,
    MerchantService,
  ],
})
export class ChangePasswordModule {}
