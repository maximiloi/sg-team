-- CreateEnum
CREATE TYPE "public"."AppointmentStatus" AS ENUM ('SCHEDULED', 'CONFIRMED', 'IN_PROGRESS', 'DONE', 'CANCELLED');

-- AlterTable
ALTER TABLE "public"."Appointment" ADD COLUMN     "status" "public"."AppointmentStatus" NOT NULL DEFAULT 'SCHEDULED';
