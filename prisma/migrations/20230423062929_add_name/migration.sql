/*
  Warnings:

  - You are about to drop the column `make` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Car` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `buildDate` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "make",
DROP COLUMN "year",
ADD COLUMN     "buildDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Car_name_key" ON "Car"("name");
