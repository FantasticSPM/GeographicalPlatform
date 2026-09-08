import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import cookieParser from 'cookie-parser';

import { CustomGlobeExceptionFilter } from './common/filters/globe-exception-filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  app.use(cookieParser());

  app.enableCors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalFilters(new CustomGlobeExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
