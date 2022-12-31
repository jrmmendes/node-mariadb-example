import { MigrationInterface, QueryRunner } from "typeorm"

export class cardsCreation1672465393776 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE cards_entity ( 
        id VARCHAR(200) NOT NULL,
        PRIMARY KEY (id)
      )`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE cards_entity
    `)
  }
}
