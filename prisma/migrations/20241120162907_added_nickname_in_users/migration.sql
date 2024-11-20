/*
  Warnings:

  - Added the required column `nickname` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_Users" ("id", "login", "password") SELECT "id", "login", "password" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_login_key" ON "Users"("login");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
