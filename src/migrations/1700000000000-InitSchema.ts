import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1700000000000 implements MigrationInterface {
  name = 'InitSchema1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" SERIAL NOT NULL,
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "task" (
        "id" SERIAL NOT NULL,
        "title" character varying NOT NULL,
        "description" character varying,
        "done" boolean NOT NULL DEFAULT false,
        "userId" integer NOT NULL,
        CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "task"
      ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b2"`);
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}