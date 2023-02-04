import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import NftEntity from '../src/nfts-module/entities/nft.entity';
import UserEntity from '../src/users-module/entities/user.entity';
import { CreateUserTbl1675441037694 } from './1675441037694-CreateUserTbl';
import { CreateNftTbl1675441121458 } from './1675441121458-CreateNftTbl';
import { SeedUsers1675441782056 } from './1675441782056-SeedUsers';
import { SeedNfts1675442701702 } from './1675442701702-SeedNfts';

config({
  path: __dirname + '/./../env/.env',
});

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [UserEntity, NftEntity],
  migrations: [
    CreateUserTbl1675441037694,
    CreateNftTbl1675441121458,
    SeedUsers1675441782056,
    SeedNfts1675442701702,
  ],
});
