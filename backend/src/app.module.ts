import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.ts';
import { AppService } from './app.service.ts';
import { EarthquakeModule } from './earthquake/earthquake.module.ts';
import { AuthModule } from './auth/auth.module.ts';
import { TestModule } from './test/test.module.ts';

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
