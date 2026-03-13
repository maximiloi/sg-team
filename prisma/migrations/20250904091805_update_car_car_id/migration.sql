-- DropForeignKey
ALTER TABLE "public"."Appointment" DROP CONSTRAINT "Appointment_carId_fkey";

-- AlterTable
ALTER TABLE "public"."Appointment" ALTER COLUMN "carId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Appointment" ADD CONSTRAINT "Appointment_carId_fkey" FOREIGN KEY ("carId") REFERENCES "public"."Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;
