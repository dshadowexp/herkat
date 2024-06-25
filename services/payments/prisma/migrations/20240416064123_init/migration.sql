/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `aid` on the `Account` table. All the data in the column will be lost.
  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[uid]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[said]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[externalRef]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `said` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalRef` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `methodId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CHARGED', 'PENDING', 'SUCCEEDED', 'FAILED', 'REFUNDED', 'DISPUTED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "aid",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "said" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Account_id_seq";

-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "destinationId" TEXT NOT NULL,
ADD COLUMN     "externalRef" TEXT NOT NULL,
ADD COLUMN     "methodId" TEXT NOT NULL,
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'CHARGED',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Transaction_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Account_uid_key" ON "Account"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Account_said_key" ON "Account"("said");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_externalRef_key" ON "Transaction"("externalRef");
