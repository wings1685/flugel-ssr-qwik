/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is rendered outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import { createRenderer } from "@qwik.dev/router";
import Root from "./root";

export default createRenderer((opts) => {
	return {
		jsx: <Root />,
		options: {
			...opts,
			containerAttributes: {
			lang: "en-us",
				...opts.containerAttributes,
			},
			serverData: {
				...opts.serverData,
			},
			streaming: { ...opts.streaming },
		},
	};
});
