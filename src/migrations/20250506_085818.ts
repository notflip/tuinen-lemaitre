import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_feature_media_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_media_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum_mux_video_playback_options_playback_policy" AS ENUM('signed', 'public');
  CREATE TABLE IF NOT EXISTS "pages_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "mux_video_playback_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"playback_id" varchar,
  	"playback_policy" "enum_mux_video_playback_options_playback_policy"
  );
  
  CREATE TABLE IF NOT EXISTS "mux_video" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"asset_id" varchar,
  	"duration" numeric,
  	"poster_timestamp" numeric,
  	"aspect_ratio" varchar,
  	"max_width" numeric,
  	"max_height" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages_blocks_feature" ADD COLUMN "media_type" "enum_pages_blocks_feature_media_type" DEFAULT 'image';
  ALTER TABLE "pages_blocks_feature" ADD COLUMN "video_id" integer;
  ALTER TABLE "_pages_v_blocks_feature" ADD COLUMN "media_type" "enum__pages_v_blocks_feature_media_type" DEFAULT 'image';
  ALTER TABLE "_pages_v_blocks_feature" ADD COLUMN "video_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "mux_video_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_video_id_mux_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_video_id_mux_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "mux_video_playback_options" ADD CONSTRAINT "mux_video_playback_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mux_video"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_video_order_idx" ON "pages_blocks_video" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_video_parent_id_idx" ON "pages_blocks_video" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_video_path_idx" ON "pages_blocks_video" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_video_video_idx" ON "pages_blocks_video" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_video_order_idx" ON "_pages_v_blocks_video" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_video_parent_id_idx" ON "_pages_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_video_path_idx" ON "_pages_v_blocks_video" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_video_video_idx" ON "_pages_v_blocks_video" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "mux_video_playback_options_order_idx" ON "mux_video_playback_options" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "mux_video_playback_options_parent_id_idx" ON "mux_video_playback_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "mux_video_title_idx" ON "mux_video" USING btree ("title");
  CREATE INDEX IF NOT EXISTS "mux_video_updated_at_idx" ON "mux_video" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "mux_video_created_at_idx" ON "mux_video" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature" ADD CONSTRAINT "pages_blocks_feature_video_id_mux_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature" ADD CONSTRAINT "_pages_v_blocks_feature_video_id_mux_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_mux_video_fk" FOREIGN KEY ("mux_video_id") REFERENCES "public"."mux_video"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_video_idx" ON "pages_blocks_feature" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_video_idx" ON "_pages_v_blocks_feature" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_mux_video_id_idx" ON "payload_locked_documents_rels" USING btree ("mux_video_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_video" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_video" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mux_video_playback_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mux_video" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_video" CASCADE;
  DROP TABLE "_pages_v_blocks_video" CASCADE;
  DROP TABLE "mux_video_playback_options" CASCADE;
  DROP TABLE "mux_video" CASCADE;
  ALTER TABLE "pages_blocks_feature" DROP CONSTRAINT "pages_blocks_feature_video_id_mux_video_id_fk";
  
  ALTER TABLE "_pages_v_blocks_feature" DROP CONSTRAINT "_pages_v_blocks_feature_video_id_mux_video_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_mux_video_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_feature_video_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_feature_video_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_mux_video_id_idx";
  ALTER TABLE "pages_blocks_feature" DROP COLUMN IF EXISTS "media_type";
  ALTER TABLE "pages_blocks_feature" DROP COLUMN IF EXISTS "video_id";
  ALTER TABLE "_pages_v_blocks_feature" DROP COLUMN IF EXISTS "media_type";
  ALTER TABLE "_pages_v_blocks_feature" DROP COLUMN IF EXISTS "video_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "mux_video_id";
  DROP TYPE "public"."enum_pages_blocks_feature_media_type";
  DROP TYPE "public"."enum__pages_v_blocks_feature_media_type";
  DROP TYPE "public"."enum_mux_video_playback_options_playback_policy";`)
}
