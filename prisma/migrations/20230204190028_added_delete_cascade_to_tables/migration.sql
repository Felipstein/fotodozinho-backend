-- DropForeignKey
ALTER TABLE "shopping_cart_products" DROP CONSTRAINT "shopping_cart_products_shoppingCartId_fkey";

-- DropForeignKey
ALTER TABLE "shopping_carts" DROP CONSTRAINT "shopping_carts_userId_fkey";

-- AddForeignKey
ALTER TABLE "shopping_cart_products" ADD CONSTRAINT "shopping_cart_products_shoppingCartId_fkey" FOREIGN KEY ("shoppingCartId") REFERENCES "shopping_carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopping_carts" ADD CONSTRAINT "shopping_carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
