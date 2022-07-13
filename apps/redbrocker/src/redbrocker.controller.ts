import { Controller, Logger, Body } from '@nestjs/common';
import { RedbrockerService } from './redbrocker.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class RedbrockerController {
  private logger = new Logger('RedbrockerController');
  constructor(private readonly redappService: RedbrockerService) {}

  @MessagePattern('lastLocation')
  async getLocation(data: object): Promise<object> {
    this.logger.log('Last location: ' + data);
    const result = await this.redappService.getLocation(data);
    return result;
  }
}
