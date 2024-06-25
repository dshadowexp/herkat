-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Account"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
