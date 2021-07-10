/*
  Warnings:

  - The primary key for the `GROUP_TO_MAP` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `mapId` on the `GROUP_TO_MAP` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Int`.
  - The primary key for the `SEAT_MAP_INFO` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `map_id` on the `SEAT_MAP_INFO` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Int`.
  - You are about to alter the column `revision_date` on the `SEAT_MAP_INFO` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `in_charge_MAP` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `mapId` on the `in_charge_MAP` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `GROUP_TO_MAP` DROP FOREIGN KEY `GROUP_TO_MAP_ibfk_2`;

-- DropForeignKey
ALTER TABLE `in_charge_MAP` DROP FOREIGN KEY `in_charge_MAP_ibfk_1`;

-- AlterTable
ALTER TABLE `GROUP_TO_MAP` DROP PRIMARY KEY,
    MODIFY `mapId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`groupId`, `mapId`);

-- AlterTable
ALTER TABLE `SEAT_MAP_INFO` DROP PRIMARY KEY,
    MODIFY `map_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `revision_date` DATETIME NOT NULL,
    ADD PRIMARY KEY (`map_id`);

-- AlterTable
ALTER TABLE `in_charge_MAP` DROP PRIMARY KEY,
    MODIFY `mapId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`loginId`, `mapId`);

-- AddForeignKey
ALTER TABLE `GROUP_TO_MAP` ADD FOREIGN KEY (`mapId`) REFERENCES `SEAT_MAP_INFO`(`map_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `in_charge_MAP` ADD FOREIGN KEY (`mapId`) REFERENCES `SEAT_MAP_INFO`(`map_id`) ON DELETE CASCADE ON UPDATE CASCADE;
