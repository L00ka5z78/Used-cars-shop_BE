import { Injectable, NotFoundException } from '@nestjs/common';
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

  findOneUserById(id: number) {
    if (!id) {
      return null;
    }
    return this.repository.findOneBy({ id });
  }

  findUserByEmail(email: string) {
    return this.repository.find({ where: { email } });
  }
  async updateUser(id: number, attrs: Partial<User>) {
    const user = await this.findOneUserById(id);
    if (!user) {
      throw new NotFoundException('user not found...');
    }
    Object.assign(user, attrs);
    return this.repository.save(user);
  }

  async removeUser(id: number) {
    const user = await this.findOneUserById(id);
    if (!user) {
      throw new NotFoundException('user not found...');
    }
    return this.repository.remove(user);
  }
}
