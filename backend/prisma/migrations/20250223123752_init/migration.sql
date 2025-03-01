/*
  Warnings:

  - You are about to drop the column `detailsId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `PersonalDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_detailsId_fkey";

-- DropIndex
DROP INDEX "User_detailsId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "detailsId";

-- DropTable
DROP TABLE "PersonalDetails";
