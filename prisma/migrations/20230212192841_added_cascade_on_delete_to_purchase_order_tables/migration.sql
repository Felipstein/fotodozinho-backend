-- DropForeignKey
ALTER TABLE "purchase_order_products" DROP CONSTRAINT "purchase_order_products_purchaseOrderId_fkey";

-- DropForeignKey
ALTER TABLE "purchase_orders" DROP CONSTRAINT "purchase_orders_userId_fkey";

-- AlterTable
ALTER TABLE "purchase_orders" ALTER COLUMN "status" SET DEFAULT 'WAITING_PAYMENT',
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "purchase_orders" ADD CONSTRAINT "purchase_orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order_products" ADD CONSTRAINT "purchase_order_products_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "purchase_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
