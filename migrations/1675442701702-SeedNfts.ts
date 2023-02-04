import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedNfts1675442701702 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        INSERT INTO public.nft_entity (id, name, description, image_url, nft_address, owner_id) VALUES (1, 'NFT 1', 'NFT 1 description', 'https://picsum.photos/200/300', '4HmDKXS35qCLQMfgag4bv7f3UfSDY3TCLWB8Uscz61DH', 1);
        INSERT INTO public.nft_entity (id, name, description, image_url, nft_address, owner_id) VALUES (2, 'NFT 2', 'NFT 2 description', 'https://picsum.photos/200/300', 'fSDY3TCLWB8Uscz61DH4HmDKXS35qCLQMfgag4bv7f3U', 1);
        INSERT INTO public.nft_entity (id, name, description, image_url, nft_address, owner_id) VALUES (3, 'NFT 3', 'NFT 3 description', 'https://picsum.photos/200/300', 'cz61DH4HmDKXS35qCLQMffSDY3TCLWB8Usgag4bv7f3U', 1);
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM public.nft_entity WHERE id IN (1, 2, 3)`,
    );
  }
}
