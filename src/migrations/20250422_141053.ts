import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_feature_testimonials" ALTER COLUMN "bg_color" SET DEFAULT 'black';
  ALTER TABLE "_pages_v_blocks_feature_testimonials" ALTER COLUMN "bg_color" SET DEFAULT 'black';
  ALTER TABLE "cases" ADD COLUMN "description" varchar;
  ALTER TABLE "_cases_v" ADD COLUMN "version_description" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_feature_testimonials" ALTER COLUMN "bg_color" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_feature_testimonials" ALTER COLUMN "bg_color" DROP DEFAULT;
  ALTER TABLE "cases" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_cases_v" DROP COLUMN IF EXISTS "version_description";`)
}
