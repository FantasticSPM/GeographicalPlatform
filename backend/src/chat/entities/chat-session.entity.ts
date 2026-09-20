import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chat_session')
export class ChatSession {
  @PrimaryGeneratedColumn()
  id: number;
}
