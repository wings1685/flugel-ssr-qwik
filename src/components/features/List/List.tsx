import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { server$, useNavigate } from "@builder.io/qwik-city";
import { updateTask } from "@/server/db/tasks/updateTask";
import { deleteTask } from "@/server/db/tasks/deleteTask";
import type { TaskItem } from "@/server/db/types";

type DataId = TaskItem['id'];

const editData = server$(async (id: DataId, data?: TaskItem) => {
	if (!data) throw new Error('Task Not Found.');

	await updateTask(data);
});

const deleteData = server$(async (id: DataId) => {
	await deleteTask({ id });
});

type Props = {
	tasks: TaskItem[];
};

export default component$((props: Props) => {
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
