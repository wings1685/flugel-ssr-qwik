import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { apiFetch } from "@/_global/lib/api";
import { buildFindQuery } from "@/server/db/tasks/fetchTasks";
import Page from "@/components/routes/Page";
import type { TaskItem } from "@/server/db/types";

export const useFetchData = routeLoader$(async ({ url }) => {
	const findQuery = buildFindQuery(url);

	return await apiFetch<TaskItem[]>('/tasks', findQuery);
});

export default component$(() => {
	const data = useFetchData();

	return <Page tasks={ data.value } />;
});
