-- AlterEnum
ALTER TYPE "HairType" ADD VALUE 'kinky';

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "focus" SET DEFAULT 'main',
ALTER COLUMN "ages" SET DEFAULT ARRAY['adult']::"Age"[],
ALTER COLUMN "sessions" SET DEFAULT ARRAY['inoffice']::"Session"[];
