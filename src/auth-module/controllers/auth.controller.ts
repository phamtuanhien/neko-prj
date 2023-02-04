import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import SignInDto from '../dtos/sign-in.dto';
import SignUpDto from '../dtos/sign-up.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() signUp: SignUpDto): any {
    return 'Hello World';
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async login(@Body() signIn: SignInDto): Promise<any> {
    return 'Hello World';
  }
}
