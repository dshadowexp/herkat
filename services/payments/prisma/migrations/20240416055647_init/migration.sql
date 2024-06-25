-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "aid" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
