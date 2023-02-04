import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import NftEntity from '../entities/nft.entity';

@Injectable()
export class NftService {
  private readonly logger = new Logger(NftService.name);

  constructor(
    @InjectRepository(NftEntity)
    private nftRepository: Repository<NftEntity>,
  ) {}

  listNft(userId: number): Promise<NftEntity[]> {
    return this.nftRepository.find({
      where: {
        owner: {
          id: userId,
        },
      },
    });
  }
}
