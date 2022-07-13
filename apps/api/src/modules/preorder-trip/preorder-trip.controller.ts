import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PreorderTripService } from './preorder-trip.service';
import { PreorderTripDto } from './dto/preorder-trip.dto';
import { AuthGuard } from '@nestjs/passport';
import SendNotificationService from './sendNotification.service';
import { ConfirmDriverOfferDto } from './dto/confirmDriverOffer.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('user/preorder-trip')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('preorder')
@ApiUnauthorizedResponse({ description: 'Provide valid token' })
export class PreorderTripController {
  constructor(
    private readonly userService: UserService,
    private readonly sendNotification: SendNotificationService,
    private readonly preorderTripService: PreorderTripService,
  ) {}

  @Post()
  @ApiCreatedResponse({ description: 'Preorder created' })
  @ApiBadRequestResponse({
    description: 'Property when should be in near future ',
  })
  @ApiOperation({
    summary: 'User orders trip',
  })
  async preorderTrip(
    @Body() preorderTripDto: PreorderTripDto,
    @Res() res,
    @Req() req,
  ) {
    try {
      preorderTripDto.userId = req.user.id;

      const { userId, when } = preorderTripDto;

      await this.preorderTripService.preorder(preorderTripDto);

      this.sendNotification.notifyNearDrivers(preorderTripDto, userId, when);

      res.status(HttpStatus.CREATED).json({ message: 'Preorder created' });
    } catch (err) {
      res.status(err.status).json({ message: err.detail || err.message });
    }
  }

  @Get('offers')
  @ApiOperation({ summary: "User checks all driver's offers" })
  async getOffers(@Res() res, @Req() req) {
    try {
      console.log(req.user.id);
      const offers = await this.preorderTripService.getAllOffers(req.user.id);

      res.json(offers);
    } catch (err) {
      res.status(err.status).json({ message: err.detail || err.message });
    }
  }

  @Put('confirm-driver')
  @ApiOperation({ summary: 'User confirm driver' })
  async confirmDriver(
    @Body() confirmDriverOfferDto: ConfirmDriverOfferDto,
    @Res() res,
    @Req() req,
  ) {
    try {
      confirmDriverOfferDto.userId = req.user.id;

      await this.preorderTripService.confirmDriver(confirmDriverOfferDto);

      res.json({ message: 'You agreed with driver' });
    } catch (err) {
      res.status(err.status).json({ message: err.detail || err.message });
    }
  }
}
