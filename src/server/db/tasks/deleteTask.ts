import { eq } from "drizzle-orm";
import { db } from "../index.ts";
import { task, taskDetail } from "../schema.ts";
import type { DeleteTaskSchema } from "#lib/_global/lib/validate.ts";

export const deleteTask = async (values: DeleteTaskSchema) => {
	const { id } = values;

	await db.transaction(async (tx) => {
		await tx.delete(task).where(eq(task.id, id));

		const detail = await tx.query.taskDetail.findFirst({
			where: eq(taskDetail.task_id, id),
		});
		if (!detail) throw new Error('TaskDetail Not Found.');

		await tx.delete(taskDetail).where(eq(taskDetail.id, detail.id));
	});

	return { success: true };
};
