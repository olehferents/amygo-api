import { Module } from '@nestjs/common';
import { RedbrockerController } from './redbrocker.controller';
import { RedbrockerService } from './redbrocker.service';

@Module({
  imports: [],
  controllers: [RedbrockerController],
  providers: [RedbrockerService],
})
export class RedbrockerModule {}
