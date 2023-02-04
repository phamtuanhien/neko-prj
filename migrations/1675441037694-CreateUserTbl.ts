import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTbl1675441037694 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE SEQUENCE user_entity_id_seq;
            CREATE TABLE IF NOT EXISTS public.user_entity
            (
                id integer NOT NULL DEFAULT nextval('user_entity_id_seq'::regclass),
                name character varying COLLATE pg_catalog."default" NOT NULL,
                email character varying COLLATE pg_catalog."default" NOT NULL,
                password character varying COLLATE pg_catalog."default" NOT NULL,
                avatar_url character varying COLLATE pg_catalog."default",
                created_at timestamp without time zone NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
                updated_at timestamp without time zone NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
                CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY (id),
                CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE (email)
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS public.user_entity;
            DROP SEQUENCE user_entity_id_seq;
        `);
  }
}
