import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'JWT_KEY',
    });
  }

  async validate(payload: IJWT) {
    // user deleted but jwt is valid
    console.log(payload);
    // throw new ForbiddenException();
    return true;
  }
}

interface IJWT {
  sub: string;
  iat: number;
  exp: number;
}
