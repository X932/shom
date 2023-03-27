import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { TrimPipe } from '@pipes/trim.pipe';
import { SignUpDto, SignInDto } from './models/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @UsePipes(TrimPipe)
  signUp(@Body() user: SignUpDto) {
    return this.authService.signUp(user);
  }

  @Post('sign-in')
  @UsePipes(TrimPipe)
  signIn(@Body() user: SignInDto) {
    return this.authService.signIn(user);
  }
}
