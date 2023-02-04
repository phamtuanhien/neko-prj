import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import UserEntity from '../../users-module/entities/user.entity';
import SignInDto from '../dtos/sign-in.dto';
import SignUpDto from '../dtos/sign-up.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() signUpData: SignUpDto): Promise<UserEntity> {
    return this.authService.signUp(signUpData);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async login(@Body() signIn: SignInDto): Promise<any> {
    return 'Hello World';
  }
}
