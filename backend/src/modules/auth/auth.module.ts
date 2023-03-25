import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersEntity } from '../users/users.entity';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    JwtModule.register({ secret: 'JWT_KEY', signOptions: { expiresIn: '1d' } }),
    TypeOrmModule.forFeature([UsersEntity]),
  ],
})
export class AuthModule {}
