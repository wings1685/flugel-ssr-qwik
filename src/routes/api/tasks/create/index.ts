import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";
import { createTask } from "@/server/db/tasks/createTask";
import { createTaskSchema, validateSafeParse } from "@/_global/lib/validate";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onPost: RequestHandler = async ({ request, json }) => {
	const data = await request.json();
	const result = validateSafeParse(createTaskSchema, data);
	if (!result.success) throw new ServerError(400, { message: 'Missing fields' });

	await createTask(result.output);

	json(201, { success: true });
};
