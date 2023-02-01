/*
  Warnings:

  - Added the required column `number` to the `print_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "print_orders" ADD COLUMN     "number" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "totalPrints" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "totalPurchases" DECIMAL(65,30) NOT NULL DEFAULT 0;
