/*
  Warnings:

  - You are about to alter the column `imagem` on the `feeds` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `feeds` MODIFY `imagem` VARCHAR(191) NOT NULL;
