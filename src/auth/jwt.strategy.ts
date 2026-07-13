import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log('JWT_SECRET =>', process.env.jwt_key);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.jwt_key || 'secretKey',
    });
  }

  async validate(payload: any) {
      console.log('PAYLOAD =>', payload);
    return {
      sub: payload.sub,
      email: payload.email,
    };
  }
}