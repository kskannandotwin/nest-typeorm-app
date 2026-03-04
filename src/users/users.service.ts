import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(userDto: UserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = this.usersRepo.create({
      ...userDto,
      password: hashedPassword,
    });
    return this.usersRepo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async update(id: number, userDto: Partial<UserDto>): Promise<UpdateResult> {
    if (userDto.password) {
      userDto.password = await bcrypt.hash(userDto.password, 10);
    }
    return this.usersRepo.update(id, userDto);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.usersRepo.delete(id);
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepo.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'name'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password: _, ...result } = user;
    return result as User;
  }

  async findByEmailWithPassword(email: string) {
    return this.usersRepo.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role'],
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepo.findOne({
      where: { id },
      select: ['id', 'email', 'name', 'role'], // Exclude password and refreshToken
    });
  }
}
