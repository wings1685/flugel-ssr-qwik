import { component$ } from "@qwik.dev/core";
import Ul from "../_parts/Ul";

export default component$(() => {
	return <Ul number={ 100000 } />;
});
