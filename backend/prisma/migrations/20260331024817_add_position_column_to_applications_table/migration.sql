/*
  Warnings:

  - Added the required column `position` to the `Applications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Applications" ADD COLUMN     "position" TEXT NOT NULL;
