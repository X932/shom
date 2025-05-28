import { MigrationInterface, QueryRunner } from 'typeorm';

export class createDatabase1748110091704 implements MigrationInterface {
  name = 'createDatabase1748110091704';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "users" ("id" SERIAL NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "first_name" character varying NOT NULL DEFAULT \'\', "last_name" character varying NOT NULL DEFAULT \'\', "role_id" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "roles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "endpoints" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_70835610dfa54ad5d990e02f70a" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "branches" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "deleted_at" TIMESTAMP, CONSTRAINT "PK_7f37d3b42defea97f1df0d19535" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "products_prices" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "deleted_at" TIMESTAMP, CONSTRAINT "PK_c02f0bb68a74c65e0578f7eadba" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TYPE "public"."accounts_history_type_enum" AS ENUM(\'income\', \'expense\')',
    );
    await queryRunner.query(
      'CREATE TABLE "accounts_history" ("id" SERIAL NOT NULL, "amount" numeric(10,2) NOT NULL DEFAULT \'0\', "type" "public"."accounts_history_type_enum" NOT NULL, "description" character varying, "is_excluded_from_statistic" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "account_id" integer, CONSTRAINT "PK_14451f938c3d06e5bdb5437d41c" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "amount" numeric(10,2) NOT NULL DEFAULT \'0\', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c54217a67ca2db95efff4740c9e" UNIQUE ("title"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "invoices" ("id" SERIAL NOT NULL, "net_amount" numeric(10,2) NOT NULL DEFAULT \'0\', "gross_amount" numeric(10,2) NOT NULL DEFAULT \'0\', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "account_id" integer, CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "invoice_details" ("id" SERIAL NOT NULL, "discount" integer NOT NULL, "quantity" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "invoice_id" integer, "product_id" integer, "product_details_id" integer, CONSTRAINT "PK_3b7f561bae12fac5d2d0df9682b" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "products" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "img_path" character varying NOT NULL, "deleted_at" TIMESTAMP, CONSTRAINT "UQ_c30f00a871de74c8e8c213acc4a" UNIQUE ("title"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "products_details" ("id" SERIAL NOT NULL, "size" integer NOT NULL, "deleted_at" TIMESTAMP, "price_id" integer, "inventory_id" integer, CONSTRAINT "REL_81896dd2e9396610702d442ed9" UNIQUE ("price_id"), CONSTRAINT "PK_ed62372001b7ea7b0a14cf12fac" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "inventory" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "product_id" integer, "branch_id" integer, CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "roles_endpoints" ("role_id" integer NOT NULL, "endpoint_id" integer NOT NULL, CONSTRAINT "PK_beb43c9c77be2cd44c3c65ec7a1" PRIMARY KEY ("role_id", "endpoint_id"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_4161961755cca2e8a9842a55eb" ON "roles_endpoints" ("role_id") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_16f7e7c3da0bcf71083ece36c8" ON "roles_endpoints" ("endpoint_id") ',
    );
    await queryRunner.query(
      'CREATE TABLE "full_products_info" ("product_id" integer NOT NULL, "product_details_id" integer NOT NULL, CONSTRAINT "PK_067792b6d34d80675d035545541" PRIMARY KEY ("product_id", "product_details_id"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_c9da8db7d61f48b663ba02c2a6" ON "full_products_info" ("product_id") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_9c0d313a378c1e7af187363bc8" ON "full_products_info" ("product_details_id") ',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "accounts_history" ADD CONSTRAINT "FK_66e691c8187133e65457d4e231e" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "invoices" ADD CONSTRAINT "FK_0be7d62c458b5f7c226f3df2cad" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "invoice_details" ADD CONSTRAINT "FK_2da75e038c5b463f19965b4c739" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "invoice_details" ADD CONSTRAINT "FK_96a7c6c9ac9c2b51a11598ea897" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "invoice_details" ADD CONSTRAINT "FK_a872079c16114a16f2408ed100f" FOREIGN KEY ("product_details_id") REFERENCES "products_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "products_details" ADD CONSTRAINT "FK_81896dd2e9396610702d442ed92" FOREIGN KEY ("price_id") REFERENCES "products_prices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "products_details" ADD CONSTRAINT "FK_f662cc4665a8c849c23d64d46cc" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "inventory" ADD CONSTRAINT "FK_732fdb1f76432d65d2c136340dc" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "inventory" ADD CONSTRAINT "FK_5e4d38ade6f246f20f468a7ad4b" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "roles_endpoints" ADD CONSTRAINT "FK_4161961755cca2e8a9842a55eb3" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "roles_endpoints" ADD CONSTRAINT "FK_16f7e7c3da0bcf71083ece36c8d" FOREIGN KEY ("endpoint_id") REFERENCES "endpoints"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "full_products_info" ADD CONSTRAINT "FK_c9da8db7d61f48b663ba02c2a63" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "full_products_info" ADD CONSTRAINT "FK_9c0d313a378c1e7af187363bc8f" FOREIGN KEY ("product_details_id") REFERENCES "products_details"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "full_products_info" DROP CONSTRAINT "FK_9c0d313a378c1e7af187363bc8f"',
    );
    await queryRunner.query(
      'ALTER TABLE "full_products_info" DROP CONSTRAINT "FK_c9da8db7d61f48b663ba02c2a63"',
    );
    await queryRunner.query(
      'ALTER TABLE "roles_endpoints" DROP CONSTRAINT "FK_16f7e7c3da0bcf71083ece36c8d"',
    );
    await queryRunner.query(
      'ALTER TABLE "roles_endpoints" DROP CONSTRAINT "FK_4161961755cca2e8a9842a55eb3"',
    );
    await queryRunner.query(
      'ALTER TABLE "inventory" DROP CONSTRAINT "FK_5e4d38ade6f246f20f468a7ad4b"',
    );
    await queryRunner.query(
      'ALTER TABLE "inventory" DROP CONSTRAINT "FK_732fdb1f76432d65d2c136340dc"',
    );
    await queryRunner.query(
      'ALTER TABLE "products_details" DROP CONSTRAINT "FK_f662cc4665a8c849c23d64d46cc"',
    );
    await queryRunner.query(
      'ALTER TABLE "products_details" DROP CONSTRAINT "FK_81896dd2e9396610702d442ed92"',
    );
    await queryRunner.query(
      'ALTER TABLE "invoice_details" DROP CONSTRAINT "FK_a872079c16114a16f2408ed100f"',
    );
    await queryRunner.query(
      'ALTER TABLE "invoice_details" DROP CONSTRAINT "FK_96a7c6c9ac9c2b51a11598ea897"',
    );
    await queryRunner.query(
      'ALTER TABLE "invoice_details" DROP CONSTRAINT "FK_2da75e038c5b463f19965b4c739"',
    );
    await queryRunner.query(
      'ALTER TABLE "invoices" DROP CONSTRAINT "FK_0be7d62c458b5f7c226f3df2cad"',
    );
    await queryRunner.query(
      'ALTER TABLE "accounts_history" DROP CONSTRAINT "FK_66e691c8187133e65457d4e231e"',
    );
    await queryRunner.query(
      'ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"',
    );
    await queryRunner.query(
      'DROP INDEX "public"."IDX_9c0d313a378c1e7af187363bc8"',
    );
    await queryRunner.query(
      'DROP INDEX "public"."IDX_c9da8db7d61f48b663ba02c2a6"',
    );
    await queryRunner.query('DROP TABLE "full_products_info"');
    await queryRunner.query(
      'DROP INDEX "public"."IDX_16f7e7c3da0bcf71083ece36c8"',
    );
    await queryRunner.query(
      'DROP INDEX "public"."IDX_4161961755cca2e8a9842a55eb"',
    );
    await queryRunner.query('DROP TABLE "roles_endpoints"');
    await queryRunner.query('DROP TABLE "inventory"');
    await queryRunner.query('DROP TABLE "products_details"');
    await queryRunner.query('DROP TABLE "products"');
    await queryRunner.query('DROP TABLE "invoice_details"');
    await queryRunner.query('DROP TABLE "invoices"');
    await queryRunner.query('DROP TABLE "accounts"');
    await queryRunner.query('DROP TABLE "accounts_history"');
    await queryRunner.query('DROP TYPE "public"."accounts_history_type_enum"');
    await queryRunner.query('DROP TABLE "products_prices"');
    await queryRunner.query('DROP TABLE "branches"');
    await queryRunner.query('DROP TABLE "endpoints"');
    await queryRunner.query('DROP TABLE "roles"');
    await queryRunner.query('DROP TABLE "users"');
  }
}
