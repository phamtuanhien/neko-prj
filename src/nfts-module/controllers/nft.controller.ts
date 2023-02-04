import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth-module/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth-module/decorators/current-user.decorator';
import { JwtPayload } from '../../auth-module/interfaces/jwt-payload.interface';
import NftEntity from '../entities/nft.entity';
import { NftService } from '../services/nft.service';

@Controller('nfts')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  listNft(@CurrentUser() user: JwtPayload): Promise<NftEntity[]> {
    return this.nftService.listNft(user.id);
  }
}
