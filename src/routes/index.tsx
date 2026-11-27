import { component$ } from "@qwik.dev/core";
import { routeLoader$ } from "@qwik.dev/router";
import { buildFindQuery, fetchTasks } from "@/server/db/tasks/fetchTasks";
import Page from "@/components/routes/Page";

export const useFetchData = routeLoader$(async ({ url }) => {
	const findQuery = buildFindQuery(url.search);
	const tasks = await fetchTasks(findQuery);

	return { tasks, findQuery }
});

export default component$(() => {
	const data = useFetchData();

	return <Page { ...data.value } />;
});
