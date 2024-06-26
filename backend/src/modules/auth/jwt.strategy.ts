import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { UsersEntity } from '../users/models/users.entity';

interface IJWT {
  sub: number;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'JWT_KEY',
      passReqToCallback: true,
    });
  }

  private async findUserByID(id: number): Promise<UsersEntity | undefined> {
    return (await this.usersService.find({ id: id }))[0];
  }

  async validate(req: Request, parsedJWT: IJWT) {
    const user = await this.findUserByID(parsedJWT.sub);
    // GET /api/users/24 -> GET /api/users
    const currentEndpoint = req.path.split(/\/\d/)[0] + ' ' + req.method;

    const permission = user?.role?.endpoints.find(
      // GET /api/users/:id -> GET /api/users
      (endpoint) => endpoint.key.split('/:')[0] === currentEndpoint,
    );

    if (permission) {
      return true;
    } else if (!user) {
      throw new UnauthorizedException('Вы не авторизованы');
    } else if (!permission) {
      throw new ForbiddenException('Доступ запрещён');
    }
  }
}
