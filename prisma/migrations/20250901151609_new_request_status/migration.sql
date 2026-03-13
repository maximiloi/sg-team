/*
  Warnings:

  - The values [POSTPONED,CONFIRMED] on the enum `RequestStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."RequestStatus_new" AS ENUM ('NEW', 'IN_PROGRESS', 'CALL_CLIENT', 'DONE', 'CALLBACK', 'REJECTION', 'CANCELLED');
ALTER TABLE "public"."Request" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Request" ALTER COLUMN "status" TYPE "public"."RequestStatus_new" USING ("status"::text::"public"."RequestStatus_new");
ALTER TYPE "public"."RequestStatus" RENAME TO "RequestStatus_old";
ALTER TYPE "public"."RequestStatus_new" RENAME TO "RequestStatus";
DROP TYPE "public"."RequestStatus_old";
ALTER TABLE "public"."Request" ALTER COLUMN "status" SET DEFAULT 'NEW';
COMMIT;
