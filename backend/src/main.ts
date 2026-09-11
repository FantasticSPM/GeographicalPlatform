import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { AppModule } from './app.module.js';
import cookieParser from 'cookie-parser';

import { CustomGlobeExceptionFilter } from './common/filters/globe-exception-filter.js';
import { ResponseInterceptor } from './common/interceptors/response.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});

  app.use(cookieParser());

  app.useStaticAssets(join(import.meta.dirname, '..', 'public'));

  app.enableCors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // 全局异常过滤器
  app.useGlobalFilters(new CustomGlobeExceptionFilter());

  // 全局响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
