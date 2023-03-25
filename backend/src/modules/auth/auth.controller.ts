import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto, SignInDto } from './models/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() user: SignUpDto): Promise<string> {
    return this.authService.signUp(user);
  }

  @Post('sign-in')
  signIn(@Body() user: SignInDto): Promise<string> {
    return this.authService.signIn(user);
  }
}
