import { component$, Slot } from "@qwik.dev/core";
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
