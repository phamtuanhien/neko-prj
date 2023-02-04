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
import { UserService } from '../../users-module/services/user.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import SignUpDto from '../dtos/sign-up.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() signUpData: SignUpDto): Promise<UserEntity> {
    return this.authService.signUp(signUpData);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user): Promise<{ access_token: string }> {
    return this.authService.signIn(user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  test(@CurrentUser() user: JwtPayload) {
    return this.userService.getById(user.id);
  }
}
