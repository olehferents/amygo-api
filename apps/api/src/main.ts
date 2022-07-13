import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as rateLimit from 'express-rate-limit';
import { constant } from './constants/';
import { SwaggerMessagesEnum } from './constants/messagesEnum';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  app.use(
    rateLimit({
      windowMs: constant.RATE_LIMIT_SECONDS,
      max: constant.RATE_LIMIT_MAX_REQUESTS,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API endpoints description')
    .setDescription('API endpoints description')
    .setVersion('1.0')
    .addTag('preorder', SwaggerMessagesEnum.DESCRIBE_PREORDER_REQUIREMENTS)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
})();
