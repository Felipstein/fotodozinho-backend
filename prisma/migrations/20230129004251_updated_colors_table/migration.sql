/*
  Warnings:

  - A unique constraint covering the columns `[color]` on the table `colors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "colors_color_key" ON "colors"("color");
