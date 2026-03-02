import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwic3ViIjoxMCwiaWF0IjoxNzcyNDI1ODg4LCJleHAiOjE3NzI0Mjk0ODh9.siXf6lkPqES9lQy5SdTJCJUKCdUoI79BeJgjWg1deec',
    });
  }

  async validate(payload: any) {
    // this data will be available in the request object as req.user
    return payload;
  }
}
