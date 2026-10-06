import { task, taskDetail } from "./schema";
import type { InferSelectModel } from "drizzle-orm";

export type TaskDrizzleSchema = InferSelectModel<typeof task>;
export type TaskDetailDrizzleSchema = InferSelectModel<typeof taskDetail>;
