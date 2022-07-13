import { Controller, Body, Res, Post } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationDto } from './dto/location.dto';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Post()
  async genDestination(@Body() location: LocationDto) {
    const tripObj = {
      from: await this.locationService.genLocation(location.from),
      where: await this.locationService.genLocation(location.where),
    };
    return tripObj;
  }
}
