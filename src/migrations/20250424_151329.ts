import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_feature" ADD COLUMN "image_no_fill" boolean;
  ALTER TABLE "_pages_v_blocks_feature" ADD COLUMN "image_no_fill" boolean;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_feature" DROP COLUMN IF EXISTS "image_no_fill";
  ALTER TABLE "_pages_v_blocks_feature" DROP COLUMN IF EXISTS "image_no_fill";`)
}
