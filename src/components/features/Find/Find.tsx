/* eslint-disable qwik/no-use-visible-task */
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { defaultFindValues, type FindSchema } from "@/_global/lib/validate";
import { Form } from "@builder.io/qwik-city";

export default component$(() => {
	const findData = useSignal(defaultFindValues);

	useVisibleTask$(() => {
		const params = new URLSearchParams(location.search);

		findData.value = {
			title: params.get('title') ?? defaultFindValues.title,
			sort: (params.get('sort') ?? defaultFindValues.sort) as FindSchema['sort'],
		};
	});

	return (
		<div>
			<h1>Find</h1>
			<Form id="find_form">
				<fieldset>
					<input type="text" name="title" value={ findData.value.title } />
					<label>
						<input type="radio" name="sort" value="asc" checked={ findData.value.sort === 'asc' }  />
						<span>ASC</span>
					</label>
					<label>
						<input type="radio" name="sort" value="desc" checked={ findData.value.sort === 'desc' } />
						<span>DESC</span>
					</label>
					<button>Find</button>
				</fieldset>
			</Form>
		</div>
	)
});
