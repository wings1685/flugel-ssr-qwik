import { component$ } from "@builder.io/qwik"

export default component$(() => {
	return (
		<nav id="nav_global">
			<a href="/">Home</a>
			<a href="/stores">Stores</a>
			<a href="/building">Building</a>
		</nav>
	)
});
