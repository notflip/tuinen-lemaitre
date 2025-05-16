import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_content_bg_color" AS ENUM('bg-highlight');
  CREATE TYPE "public"."enum__pages_v_blocks_content_bg_color" AS ENUM('bg-highlight');
  ALTER TABLE "pages_blocks_content" ADD COLUMN "bg_color" "enum_pages_blocks_content_bg_color";
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "bg_color" "enum__pages_v_blocks_content_bg_color";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content" DROP COLUMN IF EXISTS "bg_color";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN IF EXISTS "bg_color";
  DROP TYPE "public"."enum_pages_blocks_content_bg_color";
  DROP TYPE "public"."enum__pages_v_blocks_content_bg_color";`)
}
