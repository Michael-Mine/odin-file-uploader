/*
  Warnings:

  - The required column `cuid` was added to the `File` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `cuid` was added to the `Folder` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "cuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "cuid" TEXT NOT NULL;
