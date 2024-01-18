-- CreateTable
CREATE TABLE "devices" (
    "id" SERIAL NOT NULL,
    "state" BOOLEAN NOT NULL,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);
