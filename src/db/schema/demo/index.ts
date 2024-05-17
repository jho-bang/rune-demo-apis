import type { CommonSchema } from "../common";

export interface DemoSchema extends CommonSchema {
  origin_src: string;
  user_id: number;
}
