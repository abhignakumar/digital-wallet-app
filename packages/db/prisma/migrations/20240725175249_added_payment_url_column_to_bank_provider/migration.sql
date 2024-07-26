/*
  Warnings:

  - A unique constraint covering the columns `[paymentUrl]` on the table `BankProvider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentUrl` to the `BankProvider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankProvider" ADD COLUMN     "paymentUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BankProvider_paymentUrl_key" ON "BankProvider"("paymentUrl");
