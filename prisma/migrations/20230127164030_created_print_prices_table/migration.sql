-- CreateTable
CREATE TABLE "print_prices" (
    "id" TEXT NOT NULL,
    "length" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "print_prices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "print_prices_length_key" ON "print_prices"("length");
