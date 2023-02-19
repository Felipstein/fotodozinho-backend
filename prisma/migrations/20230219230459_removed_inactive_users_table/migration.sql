/*
  Warnings:

  - You are about to drop the `inactive_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "inactive_users" DROP CONSTRAINT "inactive_users_userId_fkey";

-- DropTable
DROP TABLE "inactive_users";
