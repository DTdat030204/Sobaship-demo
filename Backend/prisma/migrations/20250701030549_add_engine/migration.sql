-- CreateTable
CREATE TABLE "Engine" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "assetId" INTEGER NOT NULL,

    CONSTRAINT "Engine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EngineActivityLog" (
    "id" SERIAL NOT NULL,
    "engineId" INTEGER NOT NULL,
    "HoursUsed" DOUBLE PRECISION NOT NULL,
    "note" TEXT,

    CONSTRAINT "EngineActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Engine_assetId_key" ON "Engine"("assetId");

-- AddForeignKey
ALTER TABLE "Engine" ADD CONSTRAINT "Engine_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EngineActivityLog" ADD CONSTRAINT "EngineActivityLog_engineId_fkey" FOREIGN KEY ("engineId") REFERENCES "Engine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
