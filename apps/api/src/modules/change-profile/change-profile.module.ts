import { Module } from '@nestjs/common';
import { ChangeProfileController } from './change-profile.controller';
import { ChangeProfileService } from './change-profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Bonus } from '../user/entities/bonus.entity';
import { UserService } from '../user/user.service';
import { FileUploadService } from '../file-upload';
import { Driver } from '../driver/entities/driver.entity';
import { DriverService } from '../driver/driver.service';
import { Car } from '../driver/entities/car.entity';
import { Trip } from '../trip/entities/trip.entity';
import { Merchant } from '../merchant/entities/merchant.entity';
import { MerchantService } from '../merchant/merchant.service';
import { UserModule } from '../user/user.module';


@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User, Bonus, Driver, Car, Trip, Merchant])],
  controllers: [ChangeProfileController],
  providers: [
    ChangeProfileService,
    UserService,
    FileUploadService,
    DriverService,
    MerchantService,
  ],
})
export class ChangeProfileModule {}
