import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'JWT_KEY',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, parsedJWT: IJWT) {
    // user deleted but jwt is valid
    // console.log(req.method, req.url);
    // console.log({ parsedJWT });
    // throw new ForbiddenException();
    return true;
  }
}

interface IJWT {
  sub: number;
  iat: number;
  exp: number;
}
