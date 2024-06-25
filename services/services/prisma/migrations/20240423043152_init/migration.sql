-- CreateEnum
CREATE TYPE "HairType" AS ENUM ('straight', 'wavy', 'curly', 'coily');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('trim', 'braid', 'color', 'treatment');

-- CreateEnum
CREATE TYPE "ServiceFocus" AS ENUM ('main', 'addon');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "Age" AS ENUM ('elderly', 'child', 'adult');

-- CreateEnum
CREATE TYPE "Session" AS ENUM ('inoffice', 'inperson');

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "type" "ServiceType" NOT NULL,
    "focus" "ServiceFocus" NOT NULL,
    "hairTypes" "HairType"[],
    "genders" "Gender"[],
    "ages" "Age"[],
    "sessions" "Session"[],
    "duration" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);
