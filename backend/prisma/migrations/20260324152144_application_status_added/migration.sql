-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('IN_PROGRESS', 'INTERVIEW', 'REJECTED');

-- AlterTable
ALTER TABLE "Applications" ADD COLUMN     "status" "ApplicationStatus" NOT NULL DEFAULT 'IN_PROGRESS';
