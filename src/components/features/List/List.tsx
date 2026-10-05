import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { server$, useNavigate } from "@builder.io/qwik-city";
import { apiDelete, apiUpdate } from "@/_global/lib/api";
import type { TaskItem } from "@/server/db/types";
import type { PageProps } from "@/_global/lib/types";

type DataId = TaskItem['id'];

const editData = server$(async (id: DataId, data?: TaskItem) => {
	if (!data) throw new Error('Task Not Found.');

	await apiUpdate(`/tasks/update/${id}`, data);
});

const deleteData = server$(async (id: DataId) => {
	await apiDelete(`/tasks/delete/${id}`);
});

export default component$((props: PageProps) => {
	const tasks = useSignal<TaskItem[]>([]);
	const navigate = useNavigate();

	useTask$(({ track }) => {
		track(() => props.tasks);

		tasks.value = props.tasks;
	});

	const handleEdit$ = $(async (id: DataId) => {
		const data = tasks.value.find(d => d.id === id);
		await editData(id, data);

		await navigate('/', { forceReload: true });
	});

	const handleDelete$ = $(async (id: DataId) => {
		await deleteData(id);

		await navigate('/', { forceReload: true });
	});

	return (
		<div>
			<h1>List</h1>
			<ul>
				{tasks.value.map((task, index) => (
					<li key={ task.id }>
						<input type="text" value={ task.title } onInput$={ (_, el) => tasks.value[index].title = el.value } />
						<input type="text" value={ task.text } onInput$={ (_, el) => tasks.value[index].text = el.value } />
						<button type="button" onClick$={ () => handleEdit$(task.id) }>Edit</button>
						<button type="button" onClick$={ () => handleDelete$(task.id) }>Delete</button>
					</li>
				))}
			</ul>
		</div>
	)
});
