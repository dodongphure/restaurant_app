/*
  Warnings:

  - The `category` column on the `Restaurant` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "STORE_CATEGORY" AS ENUM ('SUSHI', 'UNAGI', 'TEMPURA', 'TONKATSU', 'YAKITORI', 'SUKIYAKI', 'SOBA', 'RAMEN', 'YAKISOBA', 'OKONOMIYAKI', 'DONBURI', 'ODEN', 'KAISEKI', 'HAMBAGU', 'TEPPANYAKI', 'CURRY', 'YAKINIKU', 'NABE', 'CAFE', 'IZAKAYA', 'OTHER');

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "category",
ADD COLUMN     "category" "STORE_CATEGORY";
