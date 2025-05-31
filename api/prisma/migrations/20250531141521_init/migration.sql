-- CreateTable
CREATE TABLE "Restaurant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "images" TEXT[],
    "category" TEXT,
    "city" TEXT,
    "rating" DOUBLE PRECISION,
    "rating_count" INTEGER,
    "price_range" TEXT,
    "featuredText" TEXT,
    "featuredIcon" TEXT,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);
