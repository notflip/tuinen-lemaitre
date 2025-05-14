import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "uploads" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "uploads" CASCADE;
  ALTER TABLE "forms" DROP CONSTRAINT IF EXISTS "forms_attachment_id_uploads_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_uploads_fk";
  
  DROP INDEX IF EXISTS "forms_attachment_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_uploads_id_idx";
  ALTER TABLE "forms" DROP COLUMN IF EXISTS "attachment_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "uploads_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "uploads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  ALTER TABLE "forms" ADD COLUMN "attachment_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "uploads_id" integer;
  CREATE INDEX IF NOT EXISTS "uploads_updated_at_idx" ON "uploads" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "uploads_created_at_idx" ON "uploads" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "uploads_filename_idx" ON "uploads" USING btree ("filename");
  DO $$ BEGIN
   ALTER TABLE "forms" ADD CONSTRAINT "forms_attachment_id_uploads_id_fk" FOREIGN KEY ("attachment_id") REFERENCES "public"."uploads"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_uploads_fk" FOREIGN KEY ("uploads_id") REFERENCES "public"."uploads"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "forms_attachment_idx" ON "forms" USING btree ("attachment_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_uploads_id_idx" ON "payload_locked_documents_rels" USING btree ("uploads_id");`)
}
