import { component$, type PropsOf } from "@builder.io/qwik";
import { Form, Find, List } from "@/components/features";

type ListProps = PropsOf<typeof List>;
type FindProps = PropsOf<typeof Find>;
type Props = ListProps & {
	findQuery: FindProps;
};

export default component$((props: Props) => {
	return (
		<main>
			<Form />
			<Find { ...props.findQuery } />
			<List tasks={ props.tasks } />
		</main>
	)
});
