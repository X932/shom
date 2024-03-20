import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { TrimPipe } from '@pipes/trim.pipe';
import { ROUTES } from '@constants/routes';
import { SignUpDto, SignInDto } from './models/auth.dto';
import { AuthService } from './auth.service';

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(ROUTES.SIGN_UP)
  @UsePipes(TrimPipe)
  signUp(@Body() user: SignUpDto) {
    return this.authService.signUp(user);
  }

  @Post(ROUTES.SIGN_IN)
  @UsePipes(TrimPipe)
  signIn(@Body() user: SignInDto) {
    return this.authService.signIn(user);
  }
}
