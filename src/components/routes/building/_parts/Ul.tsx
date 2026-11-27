/* eslint-disable qwik/no-use-visible-task */
import { component$, useVisibleTask$ } from "@qwik.dev/core";
import { buildingData, buildPerformance } from "../_models/performance";
import type { LiPatternsProps } from "../_models/performance";

export default component$((props: LiPatternsProps) => {
	const data = buildingData(props.number);

	useVisibleTask$(() => {
		buildPerformance();
	}, { strategy: 'document-ready' });

	return (
		<ul>
			{data.map(item => (
				<li key={ item }>{ item }</li>
			))}
		</ul>
	)
});
