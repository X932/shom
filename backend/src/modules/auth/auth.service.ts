import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDto, SignUpDto } from './models/auth.dto';
import { UsersService } from '../users/users.service';
import { UsersEntity } from '../users/models/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async getUserByPhone(
    phone: string,
  ): Promise<UsersEntity | undefined> {
    const user = (await this.usersService.find({ phone: phone }))[0];
    return user;
  }

  public async signUp(newUser: SignUpDto): Promise<void> {
    await this.usersService.create(newUser);
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  private createJwt(user: UsersEntity): string {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload);
  }

  public async signIn(authUser: SignInDto): Promise<string> {
    const user = await this.getUserByPhone(authUser.phone);

    if (!user) {
      throw new BadRequestException();
    }

    const isPasswordValid = await this.comparePassword(
      authUser.password,
      user.password,
    );

    if (isPasswordValid) {
      return this.createJwt(user);
    }

    throw new BadRequestException();
  }
}
