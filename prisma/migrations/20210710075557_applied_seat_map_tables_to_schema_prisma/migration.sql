-- CreateTable
CREATE TABLE `ORG_GROUP_INFO` (
    `group_id` VARCHAR(45) NOT NULL,
    `group_name` VARCHAR(45) NOT NULL,
    `par_group_id` VARCHAR(45) NOT NULL,
    `group_path` VARCHAR(200) NOT NULL,
    `cocd` INTEGER NOT NULL,

    PRIMARY KEY (`group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GROUP_TO_MAP` (
    `groupId` VARCHAR(45) NOT NULL,
    `mapId` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`groupId`, `mapId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SEAT_MAP_INFO` (
    `map_id` VARCHAR(45) NOT NULL,
    `map_name` VARCHAR(45) NOT NULL,
    `status` VARCHAR(45) NOT NULL,
    `revision_date` DATETIME NOT NULL,
    `is_in_use` INTEGER NOT NULL,
    `screen_elements` JSON NOT NULL,

    PRIMARY KEY (`map_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `in_charge_MAP` (
    `loginId` VARCHAR(45) NOT NULL,
    `mapId` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`loginId`, `mapId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ORG_USER_INFO` (
    `login_id` VARCHAR(45) NOT NULL,
    `user_name` VARCHAR(45) NOT NULL,
    `group_name` VARCHAR(45) NOT NULL,
    `par_group_id` VARCHAR(45) NOT NULL,
    `position_id` VARCHAR(45) NOT NULL,
    `position_name` VARCHAR(45) NOT NULL,
    `office_tel` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `node_type` INTEGER NOT NULL,
    `user_level` INTEGER NOT NULL,
    `gubun` INTEGER NOT NULL,
    `group_id` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`login_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GROUP_TO_MAP` ADD FOREIGN KEY (`groupId`) REFERENCES `ORG_GROUP_INFO`(`group_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GROUP_TO_MAP` ADD FOREIGN KEY (`mapId`) REFERENCES `SEAT_MAP_INFO`(`map_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `in_charge_MAP` ADD FOREIGN KEY (`mapId`) REFERENCES `SEAT_MAP_INFO`(`map_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `in_charge_MAP` ADD FOREIGN KEY (`loginId`) REFERENCES `ORG_USER_INFO`(`login_id`) ON DELETE CASCADE ON UPDATE CASCADE;
