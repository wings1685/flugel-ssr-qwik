import { eq } from "drizzle-orm";
import { db } from "../";
import { task, taskDetail } from "../schema";
import type { DeleteTaskSchema } from "@/_global/lib/validate";

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
