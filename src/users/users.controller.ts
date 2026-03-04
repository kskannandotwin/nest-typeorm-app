import {
  Controller,
  Post,
  Get,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  login(@Body() body: UserDto) {
    return this.usersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    console.log('Authenticated user:', req.user); // Log the authenticated user info
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    const userId = req.user.sub;
    return this.usersService.findById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    return await this.usersService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.usersService.delete(id);
  }
}
