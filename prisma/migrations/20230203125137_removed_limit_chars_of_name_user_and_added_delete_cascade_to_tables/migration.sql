-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_userId_fkey";

-- DropForeignKey
ALTER TABLE "print_orders" DROP CONSTRAINT "print_orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "prints" DROP CONSTRAINT "prints_printOrderId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "print_orders" ADD CONSTRAINT "print_orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prints" ADD CONSTRAINT "prints_printOrderId_fkey" FOREIGN KEY ("printOrderId") REFERENCES "print_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
