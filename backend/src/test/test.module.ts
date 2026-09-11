import { Module } from '@nestjs/common';
import { TestService } from './test.service.ts';
import { TestController } from './test.controller.ts';

@Module({
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
