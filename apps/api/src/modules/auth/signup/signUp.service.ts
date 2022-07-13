import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { SignupUserDto } from './dto/signupUser.dto';
import { SignupDriverDto } from './dto/signupDriver.dto';
import { UserDto } from '../../user/dto/user.dto';
import { UserService } from '../../user/user.service';
import { DriverService } from '../../driver/driver.service';
import { SignupMerchantDto } from './dto/signup.merchant.dto';
import { MerchantService } from '../../merchant/merchant.service';

@Injectable()
export class SignUpService {
  constructor(
    private readonly usersService: UserService,
    private readonly driverService: DriverService,
    private readonly merchantService: MerchantService,
  ) {}

  public async signupUser(registerUserDto: SignupUserDto): Promise<UserDto> {
    registerUserDto.password = await bcrypt.hash(registerUserDto.password, 10);
    registerUserDto.email = registerUserDto.email.toLowerCase();

    return this.usersService.createUser(registerUserDto);
  }

  public async signupDriver(
    registerDriverDto: SignupDriverDto,
  ): Promise<UserDto> {
    registerDriverDto.password = await bcrypt.hash(
      registerDriverDto.password,
      10,
    );
    registerDriverDto.email = registerDriverDto.email.toLowerCase();

    return this.driverService.createDriver(registerDriverDto);
  }

  public async signupMerchant(
    signupMerchantDto: SignupMerchantDto,
  ): Promise<UserDto> {
    signupMerchantDto.password = await bcrypt.hash(
      signupMerchantDto.password,
      10,
    );
    signupMerchantDto.email = signupMerchantDto.email.toLowerCase();

    return this.merchantService.createMerchant(signupMerchantDto);
  }
}
