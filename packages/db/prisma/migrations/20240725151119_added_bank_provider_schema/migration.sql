/*
  Warnings:

  - You are about to drop the column `provider` on the `OnRampTransaction` table. All the data in the column will be lost.
  - Added the required column `bankProvider` to the `OnRampTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OnRampTransaction" DROP COLUMN "provider",
ADD COLUMN     "bankProvider" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "BankProvider" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "secret" TEXT NOT NULL,

    CONSTRAINT "BankProvider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BankProvider_name_key" ON "BankProvider"("name");

-- AddForeignKey
ALTER TABLE "OnRampTransaction" ADD CONSTRAINT "OnRampTransaction_bankProvider_fkey" FOREIGN KEY ("bankProvider") REFERENCES "BankProvider"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
