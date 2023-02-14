-- CreateTable
CREATE TABLE "failed_images_uploaded" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "failed_images_uploaded_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "failed_images_uploaded_key_key" ON "failed_images_uploaded"("key");
