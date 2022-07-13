import {
  Controller,
  Post,
  Put,
  HttpStatus,
  UseGuards,
  Body,
  Res,
  Req,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TripService } from './trip.service';
import { DriverService } from '../driver/driver.service';
import { TripDto } from './dto/trip.dto';
import { RateDto } from './dto/rate.dto';
import { UserService } from '../user/user.service';
import { MessagesEnum } from '../../constants/messagesEnum/messages.enum';

@UseGuards(AuthGuard('jwt'))
@Controller('trip')
export class TripController {
  constructor(
    private readonly tripService: TripService,
    private readonly driverService: DriverService,
    private readonly userService: UserService,
  ) {}

  @Post('user/create')
  @ApiBearerAuth()
  async createTrip(@Body() tripDto: TripDto, @Res() res, @Req() req) {
    try {
      await this.tripService.createTrip(tripDto, req.user.id);
      return res.status(HttpStatus.CREATED).json({
        message: 'Trip was successfully created',
        status: 201,
      });
    } catch (err) {
      res
        .status(HttpStatus.CONFLICT)
        .json({ message: err.detail || err.message });
    }
  }

  @Put('set-driver/:tripId')
  @ApiBearerAuth()
  @ApiParam({ name: 'tripId' })
  async setUser(@Param() params, @Res() res, @Req() req) {
    try {
      const tripData = await this.tripService.findTripById(params.tripId);
      const driverData = await this.driverService.findById(req.user.id);

      tripData.driver = driverData;
      await this.tripService.updateTrip(tripData);
      return res.status(HttpStatus.OK).json({
        message: MessagesEnum.TRIP_CHANGED,
      });
    } catch (err) {
      return res.status(HttpStatus.CONFLICT).json({
        message: err.message || err.detail,
      });
    }
  }

  @Get('driver-profile')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully signed in' })
  @ApiUnauthorizedResponse({ description: 'Provide valid access token' })
  async getProfile(@Res() res, @Req() req) {
    const driverData = await this.driverService.findById(req.user.id);
    const carData = await this.driverService.findCarByDriver(req.user.id);

    if (!driverData) {
      throw new NotFoundException('Driver does not exist!');
    }

    return res.status(HttpStatus.OK).json({
      name: driverData.name,
      surname: driverData.surname,
      description: driverData.description,
      phoneNumber: driverData.phoneNumber,
      carBrand: carData.brand,
      carModel: carData.model,
      carColor: carData.color,
      carType: carData.carType,
      carNumber: carData.carNumber,
    });
  }

  @Post('user-rate/create')
  @ApiBearerAuth()
  async createRate(@Body() rateDto: RateDto, @Res() res, @Req() req) {
    try {
      const userData = this.userService.findById(req.user.id);
      await this.tripService.createRate(rateDto, userData);
      return res.status(HttpStatus.OK).json({
        message: 'Rate successfully created',
        status: 201,
      });
    } catch (err) {
      return res.status(HttpStatus.CONFLICT).json({
        message: err.detail || err.message,
      });
    }
  }
}
