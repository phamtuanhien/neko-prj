import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1675441782056 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO public.user_entity (id, name, email, password) VALUES (1, 'Tuan Hien', 'tuanhien.4dev@test.com', 'Tu4nhi3nloveyou!')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM public.user_entity WHERE id = 1`);
  }
}
