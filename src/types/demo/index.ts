import type { DemoSchema } from "../../db/schema";

export interface InsertDemo
  extends Pick<DemoSchema, "origin_src" | "user_id"> {}

export interface ResponseDemo extends Partial<DemoSchema> {}
