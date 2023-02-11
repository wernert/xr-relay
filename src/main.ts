import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import { AppModule } from './app.module';

const httpsOptions = {
  key: fs.readFileSync('C:\\dev\\ssl\\ca.key'),
  cert: fs.readFileSync('C:\\dev\\ssl\\ca.crt'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
    // cors: true // ? solved via @WebSocketGateway({ cors: true })
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: https://trident:${port}/${globalPrefix}`
  );
}

bootstrap();
