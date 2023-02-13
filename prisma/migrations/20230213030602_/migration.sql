/*
  Warnings:

  - A unique constraint covering the columns `[imageUrl]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageName` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "purchase_order_products" DROP CONSTRAINT "purchase_order_products_productId_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "imageName" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_imageUrl_key" ON "products"("imageUrl");

-- CreateIndex
CREATE UNIQUE INDEX "products_key_key" ON "products"("key");

-- AddForeignKey
ALTER TABLE "purchase_order_products" ADD CONSTRAINT "purchase_order_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
