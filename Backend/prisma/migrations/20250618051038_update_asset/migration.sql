/*
  Warnings:

  - You are about to drop the column `code` on the `Asset` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Asset_code_key";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "code";

-- CreateIndex
CREATE UNIQUE INDEX "Asset_name_key" ON "Asset"("name");
