import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";
import { deleteTask } from "@/server/db/tasks/deleteTask";
import { deleteTaskSchema, validateSafeParse } from "@/_global/lib/validate";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onDelete: RequestHandler = async ({ params, json }) => {
	const input = {
		id: +(params.id ?? ''),
	};
	const result = validateSafeParse(deleteTaskSchema, input);
	if (!result.success) throw new ServerError(400, { message: 'Missing fields' });

	await deleteTask(result.output);

	json(201, { success: true });
};
