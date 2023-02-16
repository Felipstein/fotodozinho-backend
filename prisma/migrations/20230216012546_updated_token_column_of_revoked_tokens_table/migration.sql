/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `revoked_tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "revoked_tokens_token_key" ON "revoked_tokens"("token");
