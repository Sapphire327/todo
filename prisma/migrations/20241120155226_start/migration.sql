-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Priorities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "importance" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Notes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "prioritiesId" INTEGER NOT NULL,
    "usersId" INTEGER,
    CONSTRAINT "Notes_prioritiesId_fkey" FOREIGN KEY ("prioritiesId") REFERENCES "Priorities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Notes_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
