import type { DemoSchema } from '../db/schema';

export interface InsertDemo extends Pick<DemoSchema, 'origin_src'> {}
