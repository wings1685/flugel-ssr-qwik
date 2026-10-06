import { db } from "../";
import { task, taskDetail } from "../schema";
import type { CreateTaskSchema } from "@/_global/lib/validate";
import type { TaskDetail } from "../types.ts";

export const createTask = async (values: CreateTaskSchema) => {
	const { title, text } = values;

	const taskData: Pick<CreateTaskSchema, 'title'> = { title };

	await db.transaction(async (tx) => {
		const [ insertedTask ] = await tx.insert(task).values(taskData).$returningId();

		const taskDetailData: Omit<TaskDetail, 'id'> = {
			task_id: insertedTask.id,
			text: text,
		};

		await tx.insert(taskDetail).values(taskDetailData);
	});

	return { success: true };
};
