import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Trip } from './entities/trip.entity';
import { Rate } from './entities/rate.entity';
import { TripDto } from './dto/trip.dto';
import { RateDto } from './dto/rate.dto';
import { MessagesEnum } from '../../constants/messagesEnum';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,

    @InjectRepository(Rate)
    private rateRepository: Repository<Rate>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async createTrip(tripDto: TripDto, userId) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    const timeDate = new Date();

    tripDto.date = timeDate;
    tripDto.user = user;
    await this.tripRepository.save(tripDto);
  }

  public async findTripById(tripId) {
    const trip = await this.tripRepository.findOne({
      where: {
        id: tripId,
      },
      loadRelationIds: true,
    });
    return trip;
  }

  public async updateTrip(tripData) {
    await this.tripRepository.update(tripData.id, tripData);
  }

  public async createRate(rateDto: RateDto, userData) {
    const tripData = await this.findTripById(
      'c1517f5c-5f83-43cf-8bfe-8ef32f548e54',
    );
    rateDto.trip = tripData;

    // Data about trip wiil be sent via frontend

    const checkUserId = userData.then(function (el) {
      return el.id;
    });

    if ((await checkUserId) == rateDto.trip.user) {
      await this.rateRepository.save(rateDto);
    } else {
      return {
        message: MessagesEnum.TRIP_USER_NOT_ATTACHED,
      };
    }
  }
}
