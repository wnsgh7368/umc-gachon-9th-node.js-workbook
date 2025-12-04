/*
  Warnings:

  - You are about to drop the `UserMission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserMission` DROP FOREIGN KEY `UserMission_misison_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserMission` DROP FOREIGN KEY `UserMission_user_id_fkey`;

-- DropTable
DROP TABLE `UserMission`;

-- CreateTable
CREATE TABLE `user_mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `misison_id` INTEGER NOT NULL,
    `is_completed` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_misison_id_fkey` FOREIGN KEY (`misison_id`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
