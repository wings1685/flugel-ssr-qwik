import { component$, Slot } from "@builder.io/qwik";
import "@/_global/styles/global.sass";
import Header from "@/components/routes/_parts/Header";

export default component$(() => {
	return (
		<main>
			<Header />
			<Slot />
		</main>
	)
});
