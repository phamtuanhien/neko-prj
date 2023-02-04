import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftController } from './controllers/nft.controller';
import NftEntity from './entities/nft.entity';
import { NftService } from './services/nft.service';

@Module({
  imports: [TypeOrmModule.forFeature([NftEntity])],
  controllers: [NftController],
  providers: [NftService],
  exports: [NftService],
})
export class NftModule {}
