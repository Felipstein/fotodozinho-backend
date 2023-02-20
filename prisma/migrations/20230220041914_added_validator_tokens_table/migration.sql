-- CreateTable
CREATE TABLE "validator_tokens" (
    "id" TEXT NOT NULL,
    "expiresIn" DECIMAL(65,30) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "validator_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "validator_tokens_email_key" ON "validator_tokens"("email");
