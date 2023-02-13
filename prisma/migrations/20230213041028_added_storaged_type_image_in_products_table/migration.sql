/*
  Warnings:

  - Added the required column `imageStoragedType` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ImageStoragedTypeProduct" AS ENUM ('LOCAL', 'S3');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "imageStoragedType" "ImageStoragedTypeProduct" NOT NULL;
