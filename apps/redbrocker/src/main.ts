import { NestFactory } from '@nestjs/core';
import { RedbrockerModule } from './redbrocker.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

const logger = new Logger('Redis');

const microserviceOptions = {
  transport: Transport.REDIS,
  options: {
    url: 'redis://redis-brocker:6380',
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    RedbrockerModule,
    microserviceOptions,
  );
  app.listen(() => {
    logger.log('Microservice is listening...');
  });
}

bootstrap();
