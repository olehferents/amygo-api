import { Injectable } from '@nestjs/common';
import { ChangeProfileDto } from './dto/changeProfile.dto';
import { UserService } from '../user/user.service';
import { DriverService } from '../driver/driver.service';
import { MerchantService } from '../merchant/merchant.service';
import { Merchant } from '../merchant/entities/merchant.entity';
import { Driver } from '../driver/entities/driver.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ChangeProfileService {
  constructor(
    private readonly userService: UserService,
    private readonly driverService: DriverService,
    private readonly merchantService: MerchantService,
  ) {}
  public async updateProfile(
    user: User | Driver | Merchant,
    changeProfileDto: ChangeProfileDto,
    userId: string,
    role: string,
  ): Promise<void> {
    if (role === 'user') {
      await this.userService.updateProfile(user, changeProfileDto);
    }
    if (role === 'driver') {
      await this.driverService.updateProfile(user, changeProfileDto);
    }
    if (role === 'merchant') {
      await this.merchantService.updateProfile(user, changeProfileDto);
    }
  }
}
