import { eq } from "drizzle-orm";
import { db } from "../index.ts";
import { task, taskDetail } from "../schema.ts";
import type { TaskDetail } from "../types.ts";
import type { UpdateTaskSchema } from "#lib/_global/lib/validate.ts";

export const updateTask = async (values: UpdateTaskSchema) => {
	const { id, title, text } = values;

	const taskData: Pick<UpdateTaskSchema, 'title'> = { title };

	await db.transaction(async (tx) => {
		await tx.update(task).set(taskData).where(eq(task.id, id));

		const detail = await tx.query.taskDetail.findFirst({
			where: eq(taskDetail.task_id, id),
		});
		if (!detail) throw new Error('TaskDetail Not Found.');

		const taskDetailData: Omit<TaskDetail, 'id'> = {
			task_id: id,
			text: text,
		};

		await tx.update(taskDetail).set(taskDetailData).where(eq(taskDetail.id, detail.id));
	});

	return { success: true };
};
