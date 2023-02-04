/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `shopping_carts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "shopping_carts_userId_key" ON "shopping_carts"("userId");
