import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDto, SignUpDto } from './models/auth.dto';
import { UsersEntity } from '../users/models/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  private async getUserEntityByPhone(
    phone: string,
  ): Promise<UsersEntity | null> {
    const user: UsersEntity = await this.usersRepository.findOne({
      where: { phone: phone },
    });
    if (user) {
      return user;
    }
    return null;
  }

  public async signUp(newUser: SignUpDto): Promise<string> {
    const user: UsersEntity | null = await this.getUserEntityByPhone(
      newUser.phone,
    );

    if (user) {
      throw new BadRequestException();
    }

    const hashedPassword: string = await this.hashPassword(newUser.password);

    await this.usersRepository.save({
      ...newUser,
      password: hashedPassword,
    });

    return 'saved!';
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
    const user: UsersEntity | null = await this.getUserEntityByPhone(
      authUser.phone,
    );

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
