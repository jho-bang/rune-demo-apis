import type { IPool } from "../../db";
import type { DemoSchema } from "../../db/schema";
import type { InsertDemo } from "../../types";
import type { IQuery } from "../../shared/common.type";

export class DemoRepositories {
  constructor(private readonly conn: IPool) {}

  async getList(query: IQuery): Promise<DemoSchema[]> {
    const { QUERY } = this.conn;
    return QUERY`
        SELECT * FROM demo_table 
        WHERE is_deleted = false
        ORDER BY created DESC
        OFFSET ${query.skip}
        LIMIT ${query.limit};
    `;
  }

  async insert(values: InsertDemo) {
    const { VALUES } = this.conn;
    const { QUERY, ROLLBACK, COMMIT } = await this.conn.TRANSACTION();
    try {
      await QUERY`
        INSERT INTO demo_table ${VALUES(values)}       
      `;

      await COMMIT();
    } catch (e) {
      console.log(e);
      await ROLLBACK();
    }
  }
}
