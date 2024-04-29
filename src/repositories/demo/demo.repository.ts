import type { IPool } from '../../db';
import type { DemoSchema } from '../../db/schema';

export class DemoRepositories {
  constructor(private readonly conn: IPool) {}

  async query(): Promise<DemoSchema[]> {
    return this.conn.QUERY`
        SELECT * FROM demo_table 
        WHERE is_deleted = false
        ORDER BY created DESC;
    `;
  }

  async insert(values: string) {
    return this.conn
      .QUERY`INSERT INTO demo_table ("origin_src") VALUES (${values})`;
  }
}
