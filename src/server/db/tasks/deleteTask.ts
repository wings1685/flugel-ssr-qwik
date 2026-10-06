import { eq } from "drizzle-orm";
import { db } from "../";
import { deleteTaskSchema, validateSafeParse } from "@/_global/lib/validate";
import { task, taskDetail } from "../schema";
import type { DeleteTaskSchema } from "@/_global/lib/validate";

export const deleteTask = async (values: DeleteTaskSchema) => {
	const input = { id: +(values.id ?? '') };
	const result = validateSafeParse(deleteTaskSchema, input);
	if (!result.success) throw new Error('Missing fields');

	const { id } = result.output;

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
