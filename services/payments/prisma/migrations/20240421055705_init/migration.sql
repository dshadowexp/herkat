/*
  Warnings:

  - You are about to drop the column `said` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripeAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripeAccountId` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Account_said_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "said",
ADD COLUMN     "chargesEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "detailsSubmitted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stripeAccountId" TEXT NOT NULL,
ADD COLUMN     "transfersEnabled" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_uid_key" ON "Customer"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_stripeCustomerId_key" ON "Customer"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_stripeAccountId_key" ON "Account"("stripeAccountId");
