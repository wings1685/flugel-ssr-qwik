import { eq, like, asc, desc } from "drizzle-orm";
import { db } from "../index.ts";
import { task, taskDetail } from "../schema.ts";
import { defaultFindValues, findSchema, validateParse } from "#lib/_global/lib/validate.ts";
import type { FindSchema } from "#lib/_global/lib/validate.ts";

export const buildFindQuery = (url: URL) => {
	const params = url.searchParams;
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
