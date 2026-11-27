import { component$ } from "@qwik.dev/core"

export default component$(() => {
	return (
		<ul>
			<li>
				<a href="/building/list_c">li めっちゃたくさん</a>
			</li>
			<li>
				<a href="/building/list_b">li たくさん</a>
			</li>
			<li>
				<a href="/building/list_a">li ふつう</a>
			</li>
		</ul>
	)
});
