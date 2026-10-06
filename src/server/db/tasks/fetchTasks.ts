import { eq, like, asc, desc } from "drizzle-orm";
import { db } from "../";
import { task, taskDetail } from "../schema";
import { defaultFindValues, findSchema, validateParse } from "@/_global/lib/validate";
import type { FindSchema } from "@/_global/lib/validate";

export const buildFindQuery = (search: string) => {
	const params = new URLSearchParams(search);
	const findQuery = {
		title: params.get('title') ?? defaultFindValues.title,
		sort: params.get('sort') ?? defaultFindValues.sort,
	} as FindSchema;

	validateParse(findSchema, findQuery);

	return findQuery;
};

export const fetchTasks = async (findQuery: FindSchema) => {
	const query = db
		.select({
			id: task.id,
			title: task.title,
			updated_at: task.updated_at,
			text: taskDetail.text,
		})
		.from(task)
		.innerJoin(taskDetail, eq(task.id, taskDetail.task_id));

	if (findQuery.title) query.where(like(task.title, `%${findQuery.title}%`));

	if (findQuery.sort === 'asc') {
		query.orderBy(asc(task.updated_at));
	} else {
		query.orderBy(desc(task.updated_at));
	}

	return query;
};
