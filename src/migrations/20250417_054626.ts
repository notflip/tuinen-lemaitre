import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "cases_problems_problem_sentences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "cases_results_result_sentences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "cases_images_group_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "cases_stats_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"amount" varchar,
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_cases_v_version_problems_problem_sentences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_cases_v_version_results_result_sentences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_cases_v_version_images_group_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_cases_v_version_stats_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"amount" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "cases" ADD COLUMN "problems_title" varchar;
  ALTER TABLE "cases" ADD COLUMN "problems_content" varchar;
  ALTER TABLE "cases" ADD COLUMN "results_title" varchar;
  ALTER TABLE "cases" ADD COLUMN "results_content" varchar;
  ALTER TABLE "cases" ADD COLUMN "testimonial_group_image_id" integer;
  ALTER TABLE "cases" ADD COLUMN "testimonial_group_text" varchar;
  ALTER TABLE "cases" ADD COLUMN "testimonial_group_author_name" varchar;
  ALTER TABLE "cases" ADD COLUMN "testimonial_group_author_company" varchar;
  ALTER TABLE "_cases_v" ADD COLUMN "version_problems_title" varchar;
  ALTER TABLE "_cases_v" ADD COLUMN "version_problems_content" varchar;
  ALTER TABLE "_cases_v" ADD COLUMN "version_results_title" varchar;
  ALTER TABLE "_cases_v" ADD COLUMN "version_results_content" varchar;
  ALTER TABLE "_cases_v" ADD COLUMN "version_testimonial_group_image_id" integer;
  ALTER TABLE "_cases_v" ADD COLUMN "version_testimonial_group_text" varchar;
  ALTER TABLE "_cases_v" ADD COLUMN "version_testimonial_group_author_name" varchar;
  ALTER TABLE "_cases_v" ADD COLUMN "version_testimonial_group_author_company" varchar;
  DO $$ BEGIN
   ALTER TABLE "cases_problems_problem_sentences" ADD CONSTRAINT "cases_problems_problem_sentences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cases_results_result_sentences" ADD CONSTRAINT "cases_results_result_sentences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cases_images_group_images" ADD CONSTRAINT "cases_images_group_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cases_images_group_images" ADD CONSTRAINT "cases_images_group_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cases_stats_statistics" ADD CONSTRAINT "cases_stats_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_cases_v_version_problems_problem_sentences" ADD CONSTRAINT "_cases_v_version_problems_problem_sentences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_cases_v_version_results_result_sentences" ADD CONSTRAINT "_cases_v_version_results_result_sentences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_cases_v_version_images_group_images" ADD CONSTRAINT "_cases_v_version_images_group_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_cases_v_version_images_group_images" ADD CONSTRAINT "_cases_v_version_images_group_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_cases_v_version_stats_statistics" ADD CONSTRAINT "_cases_v_version_stats_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "cases_problems_problem_sentences_order_idx" ON "cases_problems_problem_sentences" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "cases_problems_problem_sentences_parent_id_idx" ON "cases_problems_problem_sentences" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "cases_results_result_sentences_order_idx" ON "cases_results_result_sentences" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "cases_results_result_sentences_parent_id_idx" ON "cases_results_result_sentences" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "cases_images_group_images_order_idx" ON "cases_images_group_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "cases_images_group_images_parent_id_idx" ON "cases_images_group_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "cases_images_group_images_image_idx" ON "cases_images_group_images" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "cases_stats_statistics_order_idx" ON "cases_stats_statistics" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "cases_stats_statistics_parent_id_idx" ON "cases_stats_statistics" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_problems_problem_sentences_order_idx" ON "_cases_v_version_problems_problem_sentences" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_problems_problem_sentences_parent_id_idx" ON "_cases_v_version_problems_problem_sentences" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_results_result_sentences_order_idx" ON "_cases_v_version_results_result_sentences" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_results_result_sentences_parent_id_idx" ON "_cases_v_version_results_result_sentences" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_images_group_images_order_idx" ON "_cases_v_version_images_group_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_images_group_images_parent_id_idx" ON "_cases_v_version_images_group_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_images_group_images_image_idx" ON "_cases_v_version_images_group_images" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_stats_statistics_order_idx" ON "_cases_v_version_stats_statistics" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_stats_statistics_parent_id_idx" ON "_cases_v_version_stats_statistics" USING btree ("_parent_id");
  DO $$ BEGIN
   ALTER TABLE "cases" ADD CONSTRAINT "cases_testimonial_group_image_id_media_id_fk" FOREIGN KEY ("testimonial_group_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_cases_v" ADD CONSTRAINT "_cases_v_version_testimonial_group_image_id_media_id_fk" FOREIGN KEY ("version_testimonial_group_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "cases_testimonial_group_testimonial_group_image_idx" ON "cases" USING btree ("testimonial_group_image_id");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_testimonial_group_version_testimonial_group_image_idx" ON "_cases_v" USING btree ("version_testimonial_group_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cases_problems_problem_sentences" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cases_results_result_sentences" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cases_images_group_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cases_stats_statistics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cases_v_version_problems_problem_sentences" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cases_v_version_results_result_sentences" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cases_v_version_images_group_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cases_v_version_stats_statistics" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "cases_problems_problem_sentences" CASCADE;
  DROP TABLE "cases_results_result_sentences" CASCADE;
  DROP TABLE "cases_images_group_images" CASCADE;
  DROP TABLE "cases_stats_statistics" CASCADE;
  DROP TABLE "_cases_v_version_problems_problem_sentences" CASCADE;
  DROP TABLE "_cases_v_version_results_result_sentences" CASCADE;
  DROP TABLE "_cases_v_version_images_group_images" CASCADE;
  DROP TABLE "_cases_v_version_stats_statistics" CASCADE;
  ALTER TABLE "cases" DROP CONSTRAINT "cases_testimonial_group_image_id_media_id_fk";
  
  ALTER TABLE "_cases_v" DROP CONSTRAINT "_cases_v_version_testimonial_group_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "cases_testimonial_group_testimonial_group_image_idx";
  DROP INDEX IF EXISTS "_cases_v_version_testimonial_group_version_testimonial_group_image_idx";
  ALTER TABLE "cases" DROP COLUMN IF EXISTS "problems_title";
  ALTER TABLE "cases" DROP COLUMN IF EXISTS "problems_content";
  ALTER TABLE "cases" DROP COLUMN IF EXISTS "results_title";
  ALTER TABLE "cases" DROP COLUMN IF EXISTS "results_content";
  ALTER TABLE "cases" DROP COLUMN IF EXISTS "testimonial_group_image_id";
  ALTER TABLE "cases" DROP COLUMN IF EXISTS "testimonial_group_text";
  ALTER TABLE "cases" DROP COLUMN IF EXISTS "testimonial_group_author_name";
  ALTER TABLE "cases" DROP COLUMN IF EXISTS "testimonial_group_author_company";
  ALTER TABLE "_cases_v" DROP COLUMN IF EXISTS "version_problems_title";
  ALTER TABLE "_cases_v" DROP COLUMN IF EXISTS "version_problems_content";
  ALTER TABLE "_cases_v" DROP COLUMN IF EXISTS "version_results_title";
  ALTER TABLE "_cases_v" DROP COLUMN IF EXISTS "version_results_content";
  ALTER TABLE "_cases_v" DROP COLUMN IF EXISTS "version_testimonial_group_image_id";
  ALTER TABLE "_cases_v" DROP COLUMN IF EXISTS "version_testimonial_group_text";
  ALTER TABLE "_cases_v" DROP COLUMN IF EXISTS "version_testimonial_group_author_name";
  ALTER TABLE "_cases_v" DROP COLUMN IF EXISTS "version_testimonial_group_author_company";`)
}
