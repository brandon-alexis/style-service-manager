/*
  Warnings:

  - You are about to alter the column `totalPrice` on the `service_records` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_service_records" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "totalPrice" BIGINT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "service_records_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_service_records" ("createdAt", "customerId", "id", "totalPrice") SELECT "createdAt", "customerId", "id", "totalPrice" FROM "service_records";
DROP TABLE "service_records";
ALTER TABLE "new_service_records" RENAME TO "service_records";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
