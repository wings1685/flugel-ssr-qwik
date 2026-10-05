import type { TaskItem } from "@/server/db/types";

export type DeepGuard<T> = {
	readonly [K in keyof T]: T[K] extends object
		? DeepGuard<T[K]>
		: T[K];
};

export type PageProps = {
	tasks: TaskItem[];
};
