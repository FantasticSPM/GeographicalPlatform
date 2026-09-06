import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EarthquakeModule } from './earthquake/earthquake.module.js';



@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'QAZxsw123',
    //   timezone: '+08:00',
    //   database: 'geographicalplatform',
    //   autoLoadEntities: true,
    //   synchronize: true, //自动同步数据库
    // }),
    EarthquakeModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
