import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import { SignUpService } from './signUp.service';
import { SignupController } from './signUp.controller';
import { FileUploadModule } from '../../file-upload/file-upload.module';
import { Driver } from '../../driver/entities/driver.entity';
import { DriverService } from '../../driver/driver.service';
import { Car } from '../../driver/entities/car.entity';
import { MerchantService } from '../../merchant/merchant.service';
import { Merchant } from '../../merchant/entities/merchant.entity';
import { Bonus } from '../../user/entities/bonus.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Driver, Car, Merchant, Bonus]),
    FileUploadModule,
  ],
  providers: [SignUpService, UserService, DriverService, MerchantService],
  controllers: [SignupController],
})
export class SignUpModule {}
