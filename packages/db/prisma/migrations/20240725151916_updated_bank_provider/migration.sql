/*
  Warnings:

  - You are about to drop the column `bankProvider` on the `OnRampTransaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[secret]` on the table `BankProvider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bankProviderId` to the `OnRampTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OnRampTransaction" DROP CONSTRAINT "OnRampTransaction_bankProvider_fkey";

-- DropIndex
DROP INDEX "BankProvider_name_key";

-- AlterTable
ALTER TABLE "OnRampTransaction" DROP COLUMN "bankProvider",
ADD COLUMN     "bankProviderId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BankProvider_secret_key" ON "BankProvider"("secret");

-- AddForeignKey
ALTER TABLE "OnRampTransaction" ADD CONSTRAINT "OnRampTransaction_bankProviderId_fkey" FOREIGN KEY ("bankProviderId") REFERENCES "BankProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
