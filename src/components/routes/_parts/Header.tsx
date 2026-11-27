import { component$ } from "@qwik.dev/core"

export default component$(() => {
	return (
		<nav id="nav_global">
			<a href="/">Home</a>
			<a href="/stores">Stores</a>
			<a href="/building">Building</a>
		</nav>
	)
});
