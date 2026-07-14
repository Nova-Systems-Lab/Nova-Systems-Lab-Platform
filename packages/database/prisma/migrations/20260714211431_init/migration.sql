-- CreateTable
CREATE TABLE "SystemHealthCheck" (
    "id" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SystemHealthCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SystemHealthCheck_service_idx" ON "SystemHealthCheck"("service");

-- CreateIndex
CREATE INDEX "SystemHealthCheck_createdAt_idx" ON "SystemHealthCheck"("createdAt");
