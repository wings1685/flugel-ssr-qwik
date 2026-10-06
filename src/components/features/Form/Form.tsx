import { $, component$, useStore } from "@builder.io/qwik";
import { server$, useNavigate } from "@builder.io/qwik-city";
import { createTask } from "@/server/db/tasks/createTask";
import { defaultCreateTaskValues } from "@/_global/lib/validate";
import type { CreateTaskSchema } from "@/_global/lib/validate";

const createData = server$(async (newData: CreateTaskSchema) => {
	await createTask(newData);
});

export default component$(() => {
	const defaultCreateValues = structuredClone({ ...defaultCreateTaskValues });
	const navigate = useNavigate();
	const newData = useStore<CreateTaskSchema>(defaultCreateValues);

	const handleCreate$ = $(async () => {
		await createData(newData);

		Object.assign(newData, defaultCreateValues);
		await navigate('/', { forceReload: true });
	});

	return (
		<div>
			<h1>Input</h1>
			<form onSubmit$={ handleCreate$ } preventdefault:submit>
				<fieldset>
					<input type="text" name="title" value={ newData.title } onInput$={ (_, el) => newData.title = el.value } placeholder="title..." />
				</fieldset>
				<fieldset>
					<input type="text" name="text" value={ newData.text } onInput$={ (_, el) => newData.text = el.value } placeholder="text..." />
				</fieldset>
				<fieldset>
					<button>Add</button>
				</fieldset>
			</form>
		</div>
	)
});
