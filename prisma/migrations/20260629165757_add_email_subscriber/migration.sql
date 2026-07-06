/*
  Warnings:

  - You are about to drop the `NewsletterSubscriber` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "NewsletterSubscriber";

-- CreateTable
CREATE TABLE "EmailSubscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailSubscriber_email_key" ON "EmailSubscriber"("email");

-- CreateIndex
CREATE INDEX "EmailSubscriber_email_idx" ON "EmailSubscriber"("email");
