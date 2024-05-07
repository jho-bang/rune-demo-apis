import type { IPool } from "../../db";
import type { DemoSchema } from "../../db/schema";
import type {
  CommonResponse,
  IListQuery,
  InsertDemo,
  ResponseDemo,
} from "../../types";

export class DemoRepositories {
  constructor(private readonly conn: IPool) {}

  async getList(query: IListQuery): Promise<CommonResponse<DemoSchema[]>> {
    const { QUERY } = this.conn;
    try {
      const res = await QUERY`
        SELECT *, (SELECT count(*) FROM like_demo_table WHERE user_id=${query.user_id} AND demo_id = demo_table.id) as is_like 
        FROM demo_table
        WHERE is_deleted = false AND user_id = ${query.user_id}
        ORDER BY created DESC
        OFFSET ${query.skip}
        LIMIT ${query.limit};
    `;

      return {
        data: res,
        message: "SUCCESS",
      };
    } catch (e: any) {
      console.error(e);
      throw e;
    }
  }

  async getById(id: number): Promise<CommonResponse<ResponseDemo>> {
    const { QUERY } = this.conn;

    try {
      const res = await QUERY`
      SELECT * FROM demo_table
      WHERE id = ${id}
    `;

      if (!res || !res.length) {
        throw new Error("NOT FOUND DEMO ITEM", { cause: 400 });
      }

      return {
        data: res[0],
        message: "SUCCESS",
      };
    } catch (e: any) {
      throw e;
    }
  }

  async insert(values: InsertDemo): Promise<CommonResponse<ResponseDemo>> {
    const { VALUES } = this.conn;
    const { QUERY, ROLLBACK, COMMIT } = await this.conn.TRANSACTION();
    try {
      const res = await QUERY`
        INSERT INTO demo_table ${VALUES(values)}       
      RETURNING *`;

      await COMMIT();

      return {
        data: res,
        message: "SUCCESS",
      };
    } catch (e: any) {
      await ROLLBACK();
      console.error(e);
      throw e;
    }
  }
}
