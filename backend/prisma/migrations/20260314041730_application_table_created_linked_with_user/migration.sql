-- CreateTable
CREATE TABLE "Applications" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "applier" TEXT NOT NULL,
    "applicationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Applications_companyEmail_key" ON "Applications"("companyEmail");

-- AddForeignKey
ALTER TABLE "Applications" ADD CONSTRAINT "Applications_applier_fkey" FOREIGN KEY ("applier") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
