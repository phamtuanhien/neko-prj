import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PostgresErrorCode } from 'src/database-module/postgres-error-codes.enum';
import { UserService } from 'src/users-module/services/user.service';
import UserEntity from '../../users-module/entities/user.entity';
import SignUpDto from '../dtos/sign-up.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly userService: UserService) {}

  async signUp(signUpData: SignUpDto): Promise<UserEntity> {
    const hashedPassword = await hash(signUpData.password, 10);
    try {
      const createdUser = await this.userService.create({
        ...signUpData,
        password: hashedPassword,
      });
      return createdUser;
    } catch (error) {
      if (error.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with this email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      this.logger.error(error);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
