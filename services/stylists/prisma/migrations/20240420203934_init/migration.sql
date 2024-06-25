/*
  Warnings:

  - You are about to drop the column `genderPref` on the `Preferences` table. All the data in the column will be lost.
  - Changed the type of `day` on the `Availability` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Day" AS ENUM ('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "Age" AS ENUM ('elderly', 'child', 'adult');

-- CreateEnum
CREATE TYPE "Session" AS ENUM ('inoffice', 'inperson');

-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "day",
ADD COLUMN     "day" "Day" NOT NULL;

-- AlterTable
ALTER TABLE "Preferences" DROP COLUMN "genderPref";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "ages" "Age"[],
ADD COLUMN     "genders" "Gender"[],
ADD COLUMN     "sessions" "Session"[];

-- DropEnum
DROP TYPE "DayType";

-- DropEnum
DROP TYPE "GenderPref";

-- CreateIndex
CREATE UNIQUE INDEX "Availability_sid_day_key" ON "Availability"("sid", "day");
