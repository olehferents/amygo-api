import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcryptjs';
import { JwtPayloadInterface } from './interfaces/jwt.payload.interface';
import { MessagesEnum } from '../../../constants/messagesEnum';
import { ResponseDto } from '../dtoResponse/response.dto';
import { DriverService } from '../../driver/driver.service';
import { MerchantService } from '../../merchant/merchant.service';

@Injectable()
export class SignInService {
  constructor(
    private readonly userService: UserService,
    private readonly driverService: DriverService,
    private readonly merchantService: MerchantService,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(
    signInUserDto: SignInDto,
    role: string,
  ): Promise<ResponseDto> {
    let userData;
    const emailValidator = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

    if (role === 'user') {
      if (emailValidator.test(signInUserDto.login)) {
        userData = await this.userService.findByEmail(
          signInUserDto.login.toLowerCase(),
        );
      } else {
        userData = await this.userService.findByPhoneNumber(
          signInUserDto.login,
        );
      }
    }

    if (role === 'driver') {
      if (emailValidator.test(signInUserDto.login)) {
        userData = await this.driverService.findByEmail(
          signInUserDto.login.toLowerCase(),
        );
      } else {
        userData = await this.driverService.findByPhoneNumber(
          signInUserDto.login,
        );
      }
    }

    if (role === 'merchant') {
      if (emailValidator.test(signInUserDto.login)) {
        userData = await this.merchantService.findByEmail(
          signInUserDto.login.toLowerCase(),
        );
      } else {
        userData = await this.merchantService.findByPhoneNumber(
          signInUserDto.login,
        );
      }
    }

    if (!userData) {
      return {
        message: MessagesEnum.SIGN_IN_FAILED,
        status: HttpStatus.UNAUTHORIZED,
      };
    }

    const isPasswordValid = await bcrypt.compare(
      signInUserDto.password,
      userData.password,
    );

    if (!isPasswordValid) {
      return {
        message: MessagesEnum.SIGN_IN_FAILED,
        status: HttpStatus.UNAUTHORIZED,
      };
    }

    const payload: JwtPayloadInterface = {
      userId: userData.id,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      status: HttpStatus.OK,
    };
  }
}
