CREATE TABLE `experiments_tasks` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`updated_at` datetime,
	CONSTRAINT `experiments_tasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `experiments_details` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`task_id` int NOT NULL,
	`text` text NOT NULL,
	CONSTRAINT `experiments_details_id` PRIMARY KEY(`id`)
);
