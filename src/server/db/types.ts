import { task, taskDetail } from "./schema";
import type { InferSelectModel } from "drizzle-orm";

export type TaskData = Omit<InferSelectModel<typeof task>, 'updated_at'>;
export type TaskDetail = InferSelectModel<typeof taskDetail>;
export type TaskItem = TaskData & Pick<TaskDetail, 'text'>;
