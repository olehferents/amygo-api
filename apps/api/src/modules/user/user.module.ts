import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { FileUploadService } from '../file-upload';
import { Driver } from '../driver/entities/driver.entity';
import { Car } from '../driver/entities/car.entity';
import { Trip } from '../trip/entities/trip.entity';
import { PreorderTrip } from '../preorder-trip/entities/preorderTrip.entity';
import { Bonus } from './entities/bonus.entity';
import { Item } from './entities/item.entity';
import { FoodOrder } from './entities/foodOrder.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Driver,
      Car,
      Trip,
      PreorderTrip,
      Bonus,
      Item,
      FoodOrder,
    ]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
    }),
  ],
  providers: [UserService, FileUploadService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
