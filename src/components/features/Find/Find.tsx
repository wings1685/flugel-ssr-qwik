import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import type { FindSchema } from "@/_global/lib/validate";

export default component$((props: FindSchema) => {
	return (
		<div>
			<h1>Find</h1>
			<Form id="find_form">
				<fieldset>
					<input type="text" name="title" value={ props.title } />
					<label>
						<input type="radio" name="sort" value="asc" checked={ props.sort === 'asc' }  />
						<span>ASC</span>
					</label>
					<label>
						<input type="radio" name="sort" value="desc" checked={ props.sort === 'desc' } />
						<span>DESC</span>
					</label>
					<button>Find</button>
				</fieldset>
			</Form>
		</div>
	)
});
