-- CreateTable
CREATE TABLE `feeds` (
    `id` VARCHAR(191) NOT NULL,
    `feed_description` VARCHAR(191) NOT NULL,
    `general_information` VARCHAR(191) NOT NULL,
    `kind` VARCHAR(191) NOT NULL,
    `sector` VARCHAR(191) NOT NULL,
    `imagem` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `feeds_feed_description_idx`(`feed_description`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects` (
    `id` VARCHAR(191) NOT NULL,
    `project_name` VARCHAR(191) NOT NULL,
    `budget` DECIMAL(65, 30) NULL,
    `balance_available` DECIMAL(65, 30) NULL,
    `local_implementation` VARCHAR(191) NULL,
    `date_start` DATETIME(3) NULL,
    `date_end` DATETIME(3) NULL,
    `project_code` VARCHAR(191) NULL,
    `account_number_project` VARCHAR(191) NULL,
    `project_status` ENUM('ACTIVO', 'TERMINADO', 'CANCELADO') NOT NULL DEFAULT 'ACTIVO',
    `type_currency` ENUM('MZN', 'USD', 'EUR', 'LIBRA') NOT NULL DEFAULT 'MZN',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `projects_project_name_key`(`project_name`),
    INDEX `projects_project_name_idx`(`project_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `partners` (
    `id` VARCHAR(191) NOT NULL,
    `partner_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nuit` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `logotipo` LONGBLOB NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `project_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `partners_partner_name_key`(`partner_name`),
    UNIQUE INDEX `partners_email_key`(`email`),
    UNIQUE INDEX `partners_nuit_key`(`nuit`),
    INDEX `partners_partner_name_idx`(`partner_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donations` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `donor_status` ENUM('ANONIMO', 'VISIVEL') NOT NULL DEFAULT 'ANONIMO',
    `phone_number` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `project_id` VARCHAR(191) NOT NULL,

    INDEX `donations_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `hashed_password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `role` ENUM('ROOT', 'USER', 'ADMIN') NOT NULL DEFAULT 'ADMIN',

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employees` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NULL,
    `gender` ENUM('MASCULINO', 'FEMININO', 'OUTRO') NOT NULL DEFAULT 'MASCULINO',
    `address` VARCHAR(191) NULL,
    `phone_number` VARCHAR(191) NULL,
    `provenance` VARCHAR(191) NULL,
    `date_birth` DATETIME(3) NULL,
    `date_start` DATETIME(3) NULL,
    `date_end` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `civil_status` ENUM('SOLTEIRO', 'CASADO', 'DIVORCIADO', 'VIUVO') NOT NULL DEFAULT 'SOLTEIRO',
    `user_id` VARCHAR(191) NOT NULL,
    `project_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `employees_phone_number_key`(`phone_number`),
    UNIQUE INDEX `employees_user_id_key`(`user_id`),
    INDEX `employees_first_name_idx`(`first_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activities` (
    `id` VARCHAR(191) NOT NULL,
    `description_activity` VARCHAR(191) NULL,
    `local_activity` VARCHAR(191) NULL,
    `purpose_activity` VARCHAR(191) NULL,
    `activity_information` VARCHAR(191) NULL,
    `imagem` LONGBLOB NULL,
    `responsible` VARCHAR(191) NOT NULL,
    `participants` VARCHAR(191) NULL,
    `date_start` DATETIME(3) NULL,
    `date_end` DATETIME(3) NULL,
    `activity_status` ENUM('EM_PROGRESSO', 'FINALIZADA', 'NAO_INICIADA') NOT NULL DEFAULT 'FINALIZADA',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `project_id` VARCHAR(191) NOT NULL,
    `employee_id` VARCHAR(191) NOT NULL,

    INDEX `activities_description_activity_idx`(`description_activity`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `opportunities` (
    `id` VARCHAR(191) NOT NULL,
    `description_opportunity` VARCHAR(191) NOT NULL,
    `details` VARCHAR(191) NULL,
    `date_start` DATETIME(3) NULL,
    `date_end` DATETIME(3) NULL,
    `responsible` VARCHAR(191) NULL,
    `published_by` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `project_id` VARCHAR(191) NOT NULL,
    `employee_id` VARCHAR(191) NOT NULL,

    INDEX `opportunities_description_opportunity_idx`(`description_opportunity`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `developers` (
    `id` VARCHAR(191) NOT NULL,
    `developer_name` VARCHAR(191) NOT NULL,
    `general_information` VARCHAR(191) NOT NULL,
    `picture` LONGBLOB NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `developers_developer_name_idx`(`developer_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `partners` ADD CONSTRAINT `partners_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donations` ADD CONSTRAINT `donations_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activities` ADD CONSTRAINT `activities_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activities` ADD CONSTRAINT `activities_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `opportunities` ADD CONSTRAINT `opportunities_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `opportunities` ADD CONSTRAINT `opportunities_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
