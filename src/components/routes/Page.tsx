import { component$ } from "@builder.io/qwik";
import { Form, Find, List } from "@/components/features";
import type { PageProps } from "@/_global/lib/types";

export default component$((props: PageProps) => {
	return (
		<main>
			<Form />
			<Find />
			<List tasks={ props.tasks } />
		</main>
	)
});
