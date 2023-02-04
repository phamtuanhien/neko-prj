import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNftTbl1675441121458 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE SEQUENCE nft_entity_id_seq;
        CREATE TABLE IF NOT EXISTS public.nft_entity
        (
            id integer NOT NULL DEFAULT nextval('nft_entity_id_seq'::regclass),
            nft_address character varying COLLATE pg_catalog."default" NOT NULL,
            name character varying COLLATE pg_catalog."default" NOT NULL,
            description character varying COLLATE pg_catalog."default" NOT NULL,
            image_url character varying COLLATE pg_catalog."default" NOT NULL,
            created_at timestamp without time zone NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
            updated_at timestamp without time zone NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
            owner_id integer,
            CONSTRAINT "PK_ed09c6a38c0f0a867d5a7b63f0d" PRIMARY KEY (id),
            CONSTRAINT "UQ_9eed51bb36564d5d0187a7c6175" UNIQUE (nft_address),
            CONSTRAINT "FK_a91ddd62a72e3aee4035ed5ae51" FOREIGN KEY (owner_id)
                REFERENCES public.user_entity (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS public.nft_entity;
        DROP SEQUENCE nft_entity_id_seq;
    `);
  }
}
