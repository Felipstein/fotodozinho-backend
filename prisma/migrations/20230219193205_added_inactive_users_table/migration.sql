-- CreateTable
CREATE TABLE "inactive_users" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "inactive_users_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "inactive_users" ADD CONSTRAINT "inactive_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
