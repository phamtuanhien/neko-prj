import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import UserEntity from 'src/users-module/entities/user.entity';
import { PostgresErrorCode } from '../../database-module/postgres-error-codes.enum';
import { UserService } from '../../users-module/services/user.service';
import SignUpDto from '../dtos/sign-up.dto';
import { AuthService } from './auth.service';

const Mock = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0dWFuaGllbi40ZGV2QHRlc3QuY29tIiwiaWF0IjoxNjc1NTAzNTQ4LCJleHAiOjE2NzU1MDM4NDh9.TdTVsjf6uUYCdM05qX8eoo2vWBJ9hsHrlazMQ8c4Bvs',
};

describe('AuthService', () => {
  let authService: AuthService;
  let createUser: jest.Mock;
  let getUserByEmail: jest.Mock;

  beforeEach(async () => {
    createUser = jest.fn();
    getUserByEmail = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: () => Mock.access_token,
          },
        },
        {
          provide: UserService,
          useValue: {
            create: createUser,
            getByEmail: getUserByEmail,
          },
        },
      ],
    }).compile();
    authService = await module.get<AuthService>(AuthService);
  });

  it('should be an instanceof AuthService', () => {
    expect(authService).toBeInstanceOf(AuthService);
  });

  describe('signUp', () => {
    it('should create new user', async () => {
      const signUpData: SignUpDto = {
        email: 'signUp@test.com',
        name: 'John Doe',
        password: 'Tu@nhi3dev',
      };
      createUser.mockResolvedValue(signUpData);
      await expect(authService.signUp(signUpData)).resolves.toBeTruthy();
    });

    it('should throw error if email is already in use', async () => {
      const signUpData: SignUpDto = {
        email: 'signUp@test.com',
        name: 'John Doe',
        password: 'Tu@nhi3dev',
      };
      createUser.mockRejectedValue({ code: PostgresErrorCode.UniqueViolation });
      await expect(authService.signUp(signUpData)).rejects.toThrowError(
        'User with this email already exists',
      );
    });
  });

  describe('signIn', () => {
    it('should return access_token', async () => {
      const user: UserEntity = {
        id: 1,
        name: 'John Doe',
        email: 'signIn@test.com',
        password: 'Tu@nhi3dev',
        nfts: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await expect(authService.signIn(user)).resolves.toEqual({
        access_token: Mock.access_token,
      });
    });
  });

  describe('validate', () => {
    const user: UserEntity = {
      id: 1,
      name: 'John Doe',
      email: 'validate@test.com',
      password: '$2b$10$A2mSvLR2y3nb.6Ca5yS4zeVqbcM7a4ldKG.vdGbdEZijzLJhng7qC',
      nfts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should return user', async () => {
      getUserByEmail.mockResolvedValue(user);
      await expect(
        authService.validate(user.email, 'Tu4nhi3nloveyou!'),
      ).resolves.toBeTruthy();
    });

    it('should throw error if user not found', async () => {
      getUserByEmail.mockResolvedValue(null);
      await expect(
        authService.validate('validate@test.com', 'Tu4nhi3nloveyou!'),
      ).rejects.toThrowError('Invalid credentials');
    });

    it('should throw error if password not match', async () => {
      getUserByEmail.mockResolvedValue(user);
      await expect(
        authService.validate('validate@test.com', 'Tu4nhi3n'),
      ).rejects.toThrowError('Invalid credentials');
    });
  });
});
