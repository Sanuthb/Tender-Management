/*
  Warnings:

  - A unique constraint covering the columns `[detailsId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "detailsId" TEXT;

-- CreateTable
CREATE TABLE "PersonalDetails" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "PersonalDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_detailsId_key" ON "User"("detailsId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_detailsId_fkey" FOREIGN KEY ("detailsId") REFERENCES "PersonalDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;
