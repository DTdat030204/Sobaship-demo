-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "lastMaintenanceDate" TIMESTAMP(3),
ADD COLUMN     "nextMaintenanceDate" TIMESTAMP(3);
