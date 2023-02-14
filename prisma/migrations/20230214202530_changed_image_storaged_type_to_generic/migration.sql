/*
  Warnings:

  - Changed the type of `storagedType` on the `failed_images_uploaded` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `imageStoragedType` to the `prints` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `imageStoragedType` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ImageStoragedType" AS ENUM ('LOCAL', 'S3');

-- AlterTable
ALTER TABLE "failed_images_uploaded" DROP COLUMN "storagedType",
ADD COLUMN     "storagedType" "ImageStoragedType" NOT NULL;

-- AlterTable
ALTER TABLE "prints" ADD COLUMN     "imageStoragedType" "ImageStoragedType" NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "imageStoragedType",
ADD COLUMN     "imageStoragedType" "ImageStoragedType" NOT NULL;

-- DropEnum
DROP TYPE "ImageStoragedTypeProduct";
