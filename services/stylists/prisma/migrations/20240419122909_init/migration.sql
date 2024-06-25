-- CreateEnum
CREATE TYPE "HairType" AS ENUM ('STRAIGHT', 'WAVY', 'CURLY', 'COILY');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('TRIM', 'BRAID', 'COLOR', 'TREATMENT');

-- CreateEnum
CREATE TYPE "ServiceFocus" AS ENUM ('HEAD', 'BEARD');

-- CreateEnum
CREATE TYPE "DayType" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "GenderPref" AS ENUM ('MALE', 'FEMALE', 'ALL');

-- CreateTable
CREATE TABLE "Stylist" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "bookings" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "verified" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stylist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preferences" (
    "sid" TEXT NOT NULL,
    "geoIndex" TEXT NOT NULL,
    "hairTypes" "HairType"[],
    "genderPref" "GenderPref" NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Availability" (
    "sid" TEXT NOT NULL,
    "day" "DayType" NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "type" "ServiceType" NOT NULL,
    "focus" "ServiceFocus" NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stylist_uid_key" ON "Stylist"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Preferences_sid_key" ON "Preferences"("sid");

-- CreateIndex
CREATE INDEX "Preferences_geoIndex_idx" ON "Preferences"("geoIndex");

-- CreateIndex
CREATE UNIQUE INDEX "Availability_day_key" ON "Availability"("day");

-- CreateIndex
CREATE INDEX "Service_type_focus_idx" ON "Service"("type", "focus");

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_sid_fkey" FOREIGN KEY ("sid") REFERENCES "Stylist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_sid_fkey" FOREIGN KEY ("sid") REFERENCES "Stylist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_sid_fkey" FOREIGN KEY ("sid") REFERENCES "Stylist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
