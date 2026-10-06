import { eq } from "drizzle-orm";
import { db } from "../";
import { task, taskDetail } from "../schema";
import type { TaskDetail } from "../types";
import type { UpdateTaskSchema } from "@/_global/lib/validate";

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
