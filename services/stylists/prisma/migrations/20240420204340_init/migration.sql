/*
  Warnings:

  - The values [head,beard] on the enum `ServiceFocus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `sid` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `sid` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the `Preferences` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[uid,day]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uid` to the `Availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ServiceFocus_new" AS ENUM ('main', 'addon');
ALTER TABLE "Service" ALTER COLUMN "focus" TYPE "ServiceFocus_new" USING ("focus"::text::"ServiceFocus_new");
ALTER TYPE "ServiceFocus" RENAME TO "ServiceFocus_old";
ALTER TYPE "ServiceFocus_new" RENAME TO "ServiceFocus";
DROP TYPE "ServiceFocus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_sid_fkey";

-- DropForeignKey
ALTER TABLE "Preferences" DROP CONSTRAINT "Preferences_sid_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_sid_fkey";

-- DropIndex
DROP INDEX "Availability_sid_day_key";

-- DropIndex
DROP INDEX "Service_type_focus_idx";

-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "sid",
ADD COLUMN     "uid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "sid",
ADD COLUMN     "uid" TEXT NOT NULL;

-- DropTable
DROP TABLE "Preferences";

-- CreateIndex
CREATE UNIQUE INDEX "Availability_uid_day_key" ON "Availability"("uid", "day");
