-- CreateEnum
CREATE TYPE "PrintOrderStatus" AS ENUM ('WAITING', 'IN_PRODUCTION', 'DONE');

-- CreateTable
CREATE TABLE "print_orders" (
    "id" TEXT NOT NULL,
    "status" "PrintOrderStatus" NOT NULL DEFAULT 'WAITING',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "print_orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "print_orders" ADD CONSTRAINT "print_orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
