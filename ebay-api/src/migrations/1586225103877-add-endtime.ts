import { MigrationInterface, QueryRunner } from "typeorm";

export class addEndtime1586225103877 implements MigrationInterface {
    name = 'addEndtime1586225103877'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE ebay_item ADD COLUMN "endTime" DATE NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE ebay_item ADD COLUMN "endTime"`, undefined);
    }

}
