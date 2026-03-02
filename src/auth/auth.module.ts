import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwic3ViIjoxMCwiaWF0IjoxNzcyNDI1ODg4LCJleHAiOjE3NzI0Mjk0ODh9.siXf6lkPqES9lQy5SdTJCJUKCdUoI79BeJgjWg1deec', // Change this to a secure secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
