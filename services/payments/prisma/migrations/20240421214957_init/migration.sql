/*
  Warnings:

  - You are about to drop the column `transfersEnabled` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "transfersEnabled",
ADD COLUMN     "payoutsEnabled" BOOLEAN NOT NULL DEFAULT false;
