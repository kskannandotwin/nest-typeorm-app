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
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwic3ViIjo5LCJpYXQiOjE3NzIxNzc4ODQsImV4cCI6MTc3MjE4MTQ4NH0.OAKaIaw_rUakp-3Sxg3yPc204yUiFd_z8n8XL9-wRyo', // Change this to a secure secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
