/*
  Warnings:

  - You are about to drop the `color` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "devices" ADD COLUMN     "color" INTEGER NOT NULL DEFAULT 16777215;

-- DropTable
DROP TABLE "color";
