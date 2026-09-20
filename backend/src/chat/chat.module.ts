import { Module } from '@nestjs/common';
import { ChatService } from './chat.service.js';
import { ChatController } from './chat.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatSession } from './entities/chat-session.entity.ts';

@Module({
  imports: [TypeOrmModule.forFeature([ChatSession])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
