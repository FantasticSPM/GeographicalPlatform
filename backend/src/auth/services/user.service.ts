import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity.ts';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  findOneById(_id: string): Promise<any> {
    return this.userRepository.findOneBy({ id: _id });
  }

  findOneByUserName(_username: string): Promise<any> {
    return this.userRepository.findOneBy({ username: _username });
  }

  create(createUserDto: any): Promise<any> {
    return this.userRepository.save(createUserDto);
  }
}
