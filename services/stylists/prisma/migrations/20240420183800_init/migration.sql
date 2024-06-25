/*
  Warnings:

  - The values [MON,TUE,WED,THU,FRI,SAT,SUN] on the enum `DayType` will be removed. If these variants are still used in the database, this will fail.
  - The values [MALE,FEMALE] on the enum `GenderPref` will be removed. If these variants are still used in the database, this will fail.
  - The values [STRAIGHT,WAVY,CURLY,COILY] on the enum `HairType` will be removed. If these variants are still used in the database, this will fail.
  - The values [HEAD,BEARD] on the enum `ServiceFocus` will be removed. If these variants are still used in the database, this will fail.
  - The values [TRIM,BRAID,COLOR,TREATMENT] on the enum `ServiceType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[sid,day]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DayType_new" AS ENUM ('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun');
ALTER TABLE "Availability" ALTER COLUMN "day" TYPE "DayType_new" USING ("day"::text::"DayType_new");
ALTER TYPE "DayType" RENAME TO "DayType_old";
ALTER TYPE "DayType_new" RENAME TO "DayType";
DROP TYPE "DayType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "GenderPref_new" AS ENUM ('male', 'female');
ALTER TABLE "Preferences" ALTER COLUMN "genderPref" TYPE "GenderPref_new" USING ("genderPref"::text::"GenderPref_new");
ALTER TYPE "GenderPref" RENAME TO "GenderPref_old";
ALTER TYPE "GenderPref_new" RENAME TO "GenderPref";
DROP TYPE "GenderPref_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "HairType_new" AS ENUM ('straight', 'wavy', 'curly', 'coily');
ALTER TABLE "Preferences" ALTER COLUMN "hairTypes" TYPE "HairType_new"[] USING ("hairTypes"::text::"HairType_new"[]);
ALTER TYPE "HairType" RENAME TO "HairType_old";
ALTER TYPE "HairType_new" RENAME TO "HairType";
DROP TYPE "HairType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ServiceFocus_new" AS ENUM ('head', 'beard');
ALTER TABLE "Service" ALTER COLUMN "focus" TYPE "ServiceFocus_new" USING ("focus"::text::"ServiceFocus_new");
ALTER TYPE "ServiceFocus" RENAME TO "ServiceFocus_old";
ALTER TYPE "ServiceFocus_new" RENAME TO "ServiceFocus";
DROP TYPE "ServiceFocus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ServiceType_new" AS ENUM ('trim', 'braid', 'color', 'treatment');
ALTER TABLE "Service" ALTER COLUMN "type" TYPE "ServiceType_new" USING ("type"::text::"ServiceType_new");
ALTER TYPE "ServiceType" RENAME TO "ServiceType_old";
ALTER TYPE "ServiceType_new" RENAME TO "ServiceType";
DROP TYPE "ServiceType_old";
COMMIT;

-- DropIndex
DROP INDEX "Availability_day_key";

-- CreateIndex
CREATE UNIQUE INDEX "Availability_sid_day_key" ON "Availability"("sid", "day");
