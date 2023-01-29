-- CreateTable
CREATE TABLE "prints" (
    "id" TEXT NOT NULL,
    "imageName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "printPriceId" TEXT NOT NULL,
    "border" BOOLEAN NOT NULL,
    "colorId" TEXT NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "printOrderId" TEXT NOT NULL,

    CONSTRAINT "prints_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "prints_imageUrl_key" ON "prints"("imageUrl");

-- CreateIndex
CREATE UNIQUE INDEX "prints_key_key" ON "prints"("key");

-- AddForeignKey
ALTER TABLE "prints" ADD CONSTRAINT "prints_printPriceId_fkey" FOREIGN KEY ("printPriceId") REFERENCES "print_prices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prints" ADD CONSTRAINT "prints_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prints" ADD CONSTRAINT "prints_printOrderId_fkey" FOREIGN KEY ("printOrderId") REFERENCES "print_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
