/*
  Warnings:

  - You are about to drop the `purchase_order_product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "purchase_order_product" DROP CONSTRAINT "purchase_order_product_productId_fkey";

-- DropForeignKey
ALTER TABLE "purchase_order_product" DROP CONSTRAINT "purchase_order_product_purchaseOrderId_fkey";

-- DropTable
DROP TABLE "purchase_order_product";

-- CreateTable
CREATE TABLE "purchase_order_products" (
    "id" TEXT NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL DEFAULT 1,
    "productId" TEXT NOT NULL,
    "purchaseOrderId" TEXT NOT NULL,

    CONSTRAINT "purchase_order_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "purchase_order_products" ADD CONSTRAINT "purchase_order_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order_products" ADD CONSTRAINT "purchase_order_products_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "purchase_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
