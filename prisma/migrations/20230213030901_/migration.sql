-- DropForeignKey
ALTER TABLE "shopping_cart_products" DROP CONSTRAINT "shopping_cart_products_productId_fkey";

-- AddForeignKey
ALTER TABLE "shopping_cart_products" ADD CONSTRAINT "shopping_cart_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
