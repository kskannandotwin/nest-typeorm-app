import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwic3ViIjo5LCJpYXQiOjE3NzIxNzc4ODQsImV4cCI6MTc3MjE4MTQ4NH0.OAKaIaw_rUakp-3Sxg3yPc204yUiFd_z8n8XL9-wRyo',
    });
  }

  async validate(payload: any) {
    // this data will be available in the request object as req.user
    return { userId: payload.sub, email: payload.email };
  }
}
