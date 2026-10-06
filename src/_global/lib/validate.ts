import * as v from "valibot";
import type { TaskData } from "@/server/db/types";

export const validateParse = <T>(schema: v.GenericSchema<T>, data: T) => {
	v.parse(schema, data);
};
export const validateSafeParse = <T>(schema: v.GenericSchema<T>, data: T) => {
	const result = v.safeParse(schema, data);
	if (result.success) return { success: true, output: result.output };

	const issues = v.flatten<typeof schema>(result.issues);

	return {
		...issues.root ?? {},
		...issues.nested ?? {},
	};
};

export const taskSchema = v.object({
	id: v.pipe(v.number()),
	title: v.pipe(v.string(), v.nonEmpty()),
	text: v.pipe(v.string(), v.nonEmpty()),
}) satisfies v.GenericSchema<TaskData>;
export type TaskSchema = v.InferInput<typeof taskSchema>;
export const defaultTaskValues: TaskSchema = {
	id: 0,
	title: '',
	text: '',
};

export const findSchema = v.object({
	title: v.optional(v.string()),
	sort: v.union([ v.literal('asc'), v.literal('desc') ]),
});
export type FindSchema = v.InferInput<typeof findSchema>;
export const defaultFindValues: FindSchema = {
	title: '',
	sort: 'desc',
};

const omitToCreateTask = ['id'] as const;
type CreateTaskFormData = Omit<TaskData, (typeof omitToCreateTask)[number]>;
export const createTaskSchema = v.omit(taskSchema, omitToCreateTask) satisfies v.GenericSchema<CreateTaskFormData>;
export type CreateTaskSchema = v.InferInput<typeof createTaskSchema>;
export const defaultCreateTaskValues: CreateTaskSchema = {
	title: '',
	text: '',
};

type DeleteTaskFormData = Pick<TaskData, 'id'>;
export const deleteTaskSchema = v.pick(taskSchema, ['id']) satisfies v.GenericSchema<DeleteTaskFormData>;
export type DeleteTaskSchema = v.InferInput<typeof deleteTaskSchema>;
export const defaultDeleteTaskValues: DeleteTaskSchema = {
	id: 0,
};
