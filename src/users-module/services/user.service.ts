import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from '../dtos/create-user.dto';
import UserEntity from '../entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }
}
