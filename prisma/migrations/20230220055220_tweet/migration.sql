/*
  Warnings:

  - You are about to drop the `Tweet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `tweetId` on the `Fav` table. All the data in the column will be lost.
  - Added the required column `tweettId` to the `Fav` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tweet_userId_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tweet";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Tweett" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "context" TEXT NOT NULL,
    CONSTRAINT "Tweett_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fav" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "tweettId" INTEGER NOT NULL,
    CONSTRAINT "Fav_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Fav_tweettId_fkey" FOREIGN KEY ("tweettId") REFERENCES "Tweett" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Fav" ("id", "userId") SELECT "id", "userId" FROM "Fav";
DROP TABLE "Fav";
ALTER TABLE "new_Fav" RENAME TO "Fav";
CREATE INDEX "Fav_tweettId_idx" ON "Fav"("tweettId");
CREATE INDEX "Fav_userId_idx" ON "Fav"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE INDEX "Tweett_userId_idx" ON "Tweett"("userId");
