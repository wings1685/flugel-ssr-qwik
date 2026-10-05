import { buildFindQuery, fetchTasks } from "@/server/db/tasks/fetchTasks";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ url, json }) => {
	const findQuery = buildFindQuery(url);
	const tasks = await fetchTasks(findQuery);

	json(200, tasks);
};
