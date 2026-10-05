import { mysqlTable, serial, int, datetime, text } from "drizzle-orm/mysql-core";

export const task = mysqlTable('experiments_tasks', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	updated_at: datetime('updated_at').$onUpdateFn(() => new Date()),
});

export const taskDetail = mysqlTable('experiments_details', {
	id: serial('id').primaryKey(),
	task_id: int('task_id').notNull(),
	text: text('text').notNull(),
});
