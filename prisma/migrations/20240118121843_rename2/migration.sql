/*
  Warnings:

  - You are about to drop the `Color` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Color";

-- CreateTable
CREATE TABLE "color" (
    "id" SERIAL NOT NULL,
    "color" INTEGER NOT NULL,

    CONSTRAINT "color_pkey" PRIMARY KEY ("id")
);
