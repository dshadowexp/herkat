/*
  Warnings:

  - A unique constraint covering the columns `[uid,stripeAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid,stripeCustomerId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account_uid_stripeAccountId_key" ON "Account"("uid", "stripeAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_uid_stripeCustomerId_key" ON "Customer"("uid", "stripeCustomerId");
