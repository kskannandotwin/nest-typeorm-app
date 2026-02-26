import {
  Controller,
  Post,
  Get,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.usersService.login(body.email, body.password);
  }

  @Post()
  create(@Body() body: UserDto) {
    return this.usersService.create(body);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    return await this.usersService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.usersService.delete(id);
  }
}
