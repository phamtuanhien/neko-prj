import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import UserEntity from '../../users-module/entities/user.entity';
import { CurrentUser } from '../decorators/current-user.decorator';
import SignUpDto from '../dtos/sign-up.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
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
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user): Promise<{ accessToken: string }> {
    return this.authService.signIn(user);
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  test(@CurrentUser() user: JwtPayload) {
    console.log('📢 user\n', user);

    return user;
  }
}
