CREATE TABLE `Users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NOT NULL,
	`password` VARCHAR(255) NOT NULL,
	`verified` BOOLEAN NOT NULL DEFAULT false,
	`organisation` BOOLEAN NOT NULL DEFAULT false,
	PRIMARY KEY (`id`)
);

CREATE TABLE `organisation` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`owner` VARCHAR(255) NOT NULL,
	`description` VARCHAR(255),
	PRIMARY KEY (`id`)
);

CREATE TABLE `Issue` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`reporter` INT NOT NULL,
	`assignee` INT NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`description` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Bugs` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`description` VARCHAR(255) NOT NULL,
	`assignee` INT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Users` ADD CONSTRAINT `Users_fk0` FOREIGN KEY (`organisation`) REFERENCES `organisation`(`id`);

ALTER TABLE `Issue` ADD CONSTRAINT `Issue_fk0` FOREIGN KEY (`reporter`) REFERENCES `Users`(`id`);

ALTER TABLE `Issue` ADD CONSTRAINT `Issue_fk1` FOREIGN KEY (`assignee`) REFERENCES `Users`(`id`);

ALTER TABLE `Bugs` ADD CONSTRAINT `Bugs_fk0` FOREIGN KEY (`assignee`) REFERENCES `Users`(`id`);
