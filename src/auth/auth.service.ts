import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmailWithPassword(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };

    const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Store the refresh token in the database
    await this.userService.update(user.id, { refreshToken: refresh_token });

    return {
      access_token,
      refresh_token,
    };
  }

  async refreshToken(refresh_token: string) {
    try {
      const payload = this.jwtService.verify(refresh_token);

      // get user from database
      const user = await this.userService.findById(payload.sub);

      if (!user || user.refreshToken !== refresh_token) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newPayload = {
        email: payload.email,
        sub: payload.sub,
        role: payload.role,
      };

      const newAccessToken = this.jwtService.sign(newPayload, {
        expiresIn: '15m',
      });

      return {
        access_token: newAccessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: number) {
    // Clear the refresh token in the database
    await this.userService.update(userId, { refreshToken: '' });

    return { message: 'Logged out successfully' };
  }
}
