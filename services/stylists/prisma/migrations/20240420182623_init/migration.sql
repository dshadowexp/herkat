/*
  Warnings:

  - The values [MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY] on the enum `DayType` will be removed. If these variants are still used in the database, this will fail.
  - The values [ALL] on the enum `GenderPref` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DayType_new" AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');
ALTER TABLE "Availability" ALTER COLUMN "day" TYPE "DayType_new" USING ("day"::text::"DayType_new");
ALTER TYPE "DayType" RENAME TO "DayType_old";
ALTER TYPE "DayType_new" RENAME TO "DayType";
DROP TYPE "DayType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "GenderPref_new" AS ENUM ('MALE', 'FEMALE');
ALTER TABLE "Preferences" ALTER COLUMN "genderPref" TYPE "GenderPref_new" USING ("genderPref"::text::"GenderPref_new");
ALTER TYPE "GenderPref" RENAME TO "GenderPref_old";
ALTER TYPE "GenderPref_new" RENAME TO "GenderPref";
DROP TYPE "GenderPref_old";
COMMIT;
