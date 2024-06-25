/*
  Warnings:

  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Availability" ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Stylist" ADD COLUMN     "reviews" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Service";

-- DropEnum
DROP TYPE "Age";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "HairType";

-- DropEnum
DROP TYPE "ServiceFocus";

-- DropEnum
DROP TYPE "ServiceType";

-- DropEnum
DROP TYPE "Session";

-- CreateTable
CREATE TABLE "Block" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);
