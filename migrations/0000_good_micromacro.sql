CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`email_address` text NOT NULL,
	`email_verified_at` integer,
	`created_at` integer DEFAULT current_timestamp NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_address_unique` ON `users` (`email_address`);