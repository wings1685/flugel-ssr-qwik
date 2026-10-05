import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";
import { updateTask } from "@/server/db/tasks/updateTask";
import { updateTaskSchema, validateSafeParse } from "@/_global/lib/validate";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onPut: RequestHandler = async ({ request, params, json }) => {
	const data = await request.json();
	const input = {
		...data,
		id: +(params.id ?? ''),
	};
	const result = validateSafeParse(updateTaskSchema, input);
	if (!result.success) throw new ServerError(400, { message: 'Missing fields' });

	await updateTask(result.output);

	json(201, { success: true });
};
