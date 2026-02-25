import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(user: Partial<User>) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return this.usersRepo.save(user);
  }

  findAll() {
    return this.usersRepo.find();
  }

  update(id: number, user: Partial<User>) {
    return this.usersRepo.update(id, user);
  }

  delete(id: number) {
    return this.usersRepo.delete(id);
  }
}
