-- CreateTable
CREATE TABLE "Auth" (
    "uid" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_uid_key" ON "Auth"("uid");

-- CreateIndex
CREATE INDEX "Auth_uid_idx" ON "Auth"("uid");
