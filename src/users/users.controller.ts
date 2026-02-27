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
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard) // Protect all routes in this controller with JWT authentication
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.usersService.login(body.email, body.password);
  }

  @Get('profile')
  getProfile(@Req() req) {
    return req.user; // Return the authenticated user's profile information
  }

  @Post()
  create(@Body() body: UserDto) {
    return this.usersService.create(body);
  }

  @Get()
  findAll(@Req() req) {
    console.log('Authenticated user:', req.user); // Log the authenticated user info
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
