import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PreorderTripDto } from './dto/preorder-trip.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PreorderTrip } from './entities/preorderTrip.entity';
import { constant } from '../../constants';
import { PreorderTripStatus } from './enum/PreorderTripStatus.enum';
import { Driver } from '../driver/entities/driver.entity';
import { ConfirmDriverOfferDto } from './dto/confirmDriverOffer.dto';
import SendNotificationService from './sendNotification.service';

@Injectable()
export class PreorderTripService {
  constructor(
    @InjectRepository(PreorderTrip)
    private preorderTripRepository: Repository<PreorderTrip>,
    private readonly sendNotificationService: SendNotificationService,
  ) {}

  async preorder(preorderTripDto: PreorderTripDto) {
    await this.preorderTripRepository.save(preorderTripDto);
  }

  async findAllNotAcceptedPreorderTrips(): Promise<PreorderTrip[]> {
    //TODO limit, order by location....
    const preorderTrips = await this.preorderTripRepository
      .createQueryBuilder('preorderTrips')
      .where('preorderTrips.when > :start_at', {
        start_at: new Date(),
      })
      .getMany();

    return preorderTrips;
  }

  async acceptPreorderTrip(
    preorderTripId: string,
    driver: Driver,
  ): Promise<void> {
    console.log(preorderTripId, 'preorderTripId');
    const preorderTrip = await this.preorderTripRepository.findOne({
      where: {
        preorderTripId,
      },
    });

    if (!preorderTrip) {
      throw new NotFoundException();
    }

    preorderTrip.statusOfPreorderTrip =
      PreorderTripStatus.WAITING_FOR_CONFIRMATION;
    preorderTrip.drivers.push(driver);
    await this.preorderTripRepository.save(preorderTrip);
  }

  async driverCancelPreorderTrip(
    preorderTripId: string,
    driverId: string,
  ): Promise<void> {
    const preorderTrip = await this.preorderTripRepository.findOne({
      where: {
        preorderTripId,
      },
    });

    if (!preorderTrip) {
      throw new NotFoundException();
    }

    if (
      preorderTrip.when.getTime() - new Date(Date.now()).getTime() >=
      constant.MIN_DATE_OF_PREORDER
    ) {
      preorderTrip.drivers = preorderTrip.drivers.filter(
        (driver) => driver.id !== driverId,
      );

      if (!preorderTrip.drivers.length) {
        preorderTrip.statusOfPreorderTrip = PreorderTripStatus.NO_OFFERING;
      }

      await this.preorderTripRepository.save(preorderTrip);
      return;
    }
    //TODO which exception??
    throw new NotAcceptableException(
      null,
      "You can't deny trip sooner than one hour before the trip should start",
    );
  }

  async getAllOffers(userId: string) {
    const allOffers = await this.preorderTripRepository.findOne({
      where: {
        userId,
        statusOfPreorderTrip: PreorderTripStatus.WAITING_FOR_CONFIRMATION,
      },
    });
    // if (!allOffers || allOffers.drivers.length) {
    //   throw new NotFoundException();
    // }

    return {
      preorderTripId: allOffers.preorderTripId,
      drivers: allOffers.drivers.map((driver) => {
        const {
          documentsStatus,
          documents,
          emergencyContact,
          password,
          profileImage,
          ...rest
        } = driver;
        return rest;
      }),
    };
  }

  async confirmDriver(confirmDriverOfferDto: ConfirmDriverOfferDto) {
    const { preorderTripId, driverId } = confirmDriverOfferDto;
    const preorderTrip = await this.preorderTripRepository.findOne({
      where: {
        preorderTripId,
      },
    });

    preorderTrip.drivers = preorderTrip.drivers.filter(
      (driver) => driver.id === driverId,
    );
    preorderTrip.statusOfPreorderTrip = PreorderTripStatus.ACCEPTED;

    this.sendNotificationService.notifyUserOfDriverComing(
      preorderTripId,
      preorderTrip.when,
      preorderTrip.drivers[0],
      preorderTrip.userId,
    );

    await this.preorderTripRepository.save(preorderTrip);
  }
}
