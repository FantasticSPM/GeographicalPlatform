import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findOneById(_id: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ id: _id });
    return user;
  }

  async findOneByUserName(_username: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ username: _username });
    return user;
  }

  async create(createUserDto: any): Promise<any> {
    const user = await this.userRepository.save(createUserDto);
    return user;
  }
}
