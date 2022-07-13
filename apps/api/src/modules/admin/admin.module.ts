import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DriverService } from '../driver/driver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Driver } from '../driver/entities/driver.entity';
import { Car } from '../driver/entities/car.entity';
import { Trip } from '../trip/entities/trip.entity';
import { AppGateway } from '../../app.gateway';
import { MerchantService } from '../merchant/merchant.service';
import { Merchant } from '../merchant/entities/merchant.entity';
import { UserService } from '../user/user.service';
import { FoodOrderService } from '../food-order/food-order.service';
import { FoodOrder } from '../user/entities/foodOrder.entity';
import { Item } from '../user/entities/item.entity';
import { Bonus } from '../user/entities/bonus.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Driver, Car, Trip, Merchant, FoodOrder, Item, Bonus]),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    DriverService,
    AppGateway,
    MerchantService,
    UserService,
    FoodOrderService,
  ],
})
export class AdminModule {}
