/*
  Warnings:

  - Added the required column `totalPrintsExpected` to the `print_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "print_orders" ADD COLUMN     "totalPrintsExpected" DECIMAL(65,30) NOT NULL;
