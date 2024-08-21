DO $$ BEGIN
 CREATE TYPE "public"."roles" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "twoFactorEnabled" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "roles" "roles" DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "created_at" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "last_login_at" timestamp;