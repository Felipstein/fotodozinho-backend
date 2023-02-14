/*
  Warnings:

  - Added the required column `storagedType` to the `failed_images_uploaded` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "failed_images_uploaded" ADD COLUMN     "storagedType" "ImageStoragedTypeProduct" NOT NULL;
