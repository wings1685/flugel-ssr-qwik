import { staticAdapter } from "@builder.io/qwik-city/adapters/static/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";

const mode = process.env.VITE_BUILD_MODE ?? 'ssr';
const staticTargets = mode === 'ssg' ? {
	include: ['/building/*'],
} : {
	exclude: ['/*'],
};

export default extendConfig(baseConfig, () => {
	return {
		build: {
			ssr: true,
			rollupOptions: {
				input: ["@qwik-city-plan"],
			},
		},
		plugins: [
			staticAdapter({
				origin: "https://yoursite.qwik.dev",
				...staticTargets,
			}),
		],
	};
});
