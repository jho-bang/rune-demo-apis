import type { IPool } from "../../db";
import type { DemoSchema } from "../../db/schema";
import type { IQuery } from "../../types";

export class DemoRepositories {
  constructor(private readonly conn: IPool) {}

  async getList(query: IQuery): Promise<DemoSchema[]> {
    return this.conn.QUERY`
        SELECT * FROM demo_table 
        WHERE is_deleted = false        
        ORDER BY created DESC
        OFFSET ${query.skip}
        LIMIT ${query.limit};
    `;
  }

  async insert(values: string) {
    return this.conn.QUERY`
        INSERT INTO demo_table ("origin_src") 
        VALUES (${values});
    `;
  }
}
