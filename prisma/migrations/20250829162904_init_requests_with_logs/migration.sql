/*
  Warnings:

  - You are about to drop the column `clientId` on the `ActionLog` table. All the data in the column will be lost.
  - Made the column `requestId` on table `ActionLog` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."RequestStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'POSTPONED', 'CONFIRMED', 'DONE', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "public"."ActionLog" DROP CONSTRAINT "ActionLog_clientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ActionLog" DROP CONSTRAINT "ActionLog_requestId_fkey";

-- AlterTable
ALTER TABLE "public"."ActionLog" DROP COLUMN "clientId",
ALTER COLUMN "requestId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Request" ADD COLUMN     "status" "public"."RequestStatus" NOT NULL DEFAULT 'NEW',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedById" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Request" ADD CONSTRAINT "Request_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActionLog" ADD CONSTRAINT "ActionLog_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "public"."Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
