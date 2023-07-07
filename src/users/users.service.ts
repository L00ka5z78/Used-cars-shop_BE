import { Injectable } from '@nestjs/common';
import { User } from './entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}
  createUser(email: string, password: string) {
    const user = this.repository.create({ email, password });
    return this.repository.save(user);
  }
}
