-- AlterTable
ALTER TABLE "support_requests" ALTER COLUMN "resolved" SET DEFAULT false,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
