CREATE TABLE IF NOT EXISTS "two_factor_tokens_2" (
	"id" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "two_factor_tokens_2_id_token_pk" PRIMARY KEY("id","token")
);
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "image" DROP DEFAULT;