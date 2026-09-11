import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EarthquakeModule } from './earthquake/earthquake.module.js';
import { AuthModule } from './auth/auth.module.js';
import { TestModule } from './test/test.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'geographicalplatform',
      autoLoadEntities: true,
      synchronize: true, //自动同步数据库
    }),
    EarthquakeModule,
    AuthModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
