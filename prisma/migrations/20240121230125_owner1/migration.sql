-- AlterTable
ALTER TABLE "devices" ADD COLUMN     "ownerId" INTEGER NOT NULL DEFAULT 2;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
