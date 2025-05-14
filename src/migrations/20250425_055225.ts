import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_navigation_main_link_type" AS ENUM('none', 'reference', 'custom');
  ALTER TABLE "navigation_main" ADD COLUMN "link_type" "enum_navigation_main_link_type" DEFAULT 'none';
  ALTER TABLE "navigation_main" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "navigation_main" ADD COLUMN "link_url" varchar;
  ALTER TABLE "navigation_main" ADD COLUMN "link_label" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "navigation_main" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "navigation_main" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "navigation_main" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "navigation_main" DROP COLUMN IF EXISTS "link_label";
  DROP TYPE "public"."enum_navigation_main_link_type";`)
}
