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

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  private async getUserByPhone(
    phone: string,
  ): Promise<UsersEntity | undefined> {
    const user = (await this.usersService.find({ phone: phone }))[0];
    return user;
  }

  public async signUp(newUser: SignUpDto) {
    const hashedPassword: string = await this.hashPassword(newUser.password);

    await this.usersService.create({
      ...newUser,
      password: hashedPassword,
    });
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
