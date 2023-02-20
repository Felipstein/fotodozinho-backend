/*
  Warnings:

  - You are about to drop the `PasswordRecoveryToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PasswordRecoveryToken" DROP CONSTRAINT "PasswordRecoveryToken_userId_fkey";

-- DropTable
DROP TABLE "PasswordRecoveryToken";

-- CreateTable
CREATE TABLE "password_recovery_tokens" (
    "id" TEXT NOT NULL,
    "expiresIn" DECIMAL(65,30) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "password_recovery_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "support_requests" (
    "id" TEXT NOT NULL,
    "resolved" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "support_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "password_recovery_tokens_userId_key" ON "password_recovery_tokens"("userId");

-- AddForeignKey
ALTER TABLE "password_recovery_tokens" ADD CONSTRAINT "password_recovery_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
