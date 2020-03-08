import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1583698726599 implements MigrationInterface {
  name = 'initial1583698726599';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "ebay_item" 
      (
          "id" SERIAL NOT NULL, 
          "itemId" character varying NOT NULL, 
          "title" character varying NOT NULL, 
          "globalId" character varying NOT NULL, 
          "galleryURL" character varying NOT NULL, 
          "viewItemURL" character varying NOT NULL, 
          "primaryCategoryId" character varying, 
          "finalPrice" money NOT NULL, 
          "location" character varying, 
          "country" character varying, 
          "shippingCost" money NOT NULL, 
          "totalCost" money, 
          "listingType" character varying, 
          "bestOfferEnabled" boolean NOT NULL, 
          "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
          "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
          CONSTRAINT "UQ_c905309195356f04facd6f56121" UNIQUE ("itemId"), 
          CONSTRAINT "PK_a226a633662dcd630f36507e13d" PRIMARY KEY ("id"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "ebay_item"`, undefined);
  }
}
