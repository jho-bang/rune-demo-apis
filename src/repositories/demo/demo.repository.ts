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
        SELECT 
            D.*,            
            CASE
                WHEN L.id IS NOT NULL THEN True
                ELSE False
            END AS is_liked            
        FROM demos D
        LEFT JOIN likes L ON (D.user_id = L.user_id AND D.id = L.demo_id)
        WHERE D.is_deleted = false        
        ORDER BY D.created DESC
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

  async getMyList(query: IListQuery): Promise<CommonResponse<DemoSchema[]>> {
    const { QUERY } = this.conn;
    try {
      const res = await QUERY`
         SELECT 
            D.*,            
            CASE
                WHEN L.id IS NOT NULL THEN True
                ELSE False
            END AS is_liked            
        FROM demos D
        LEFT JOIN likes L ON (D.user_id = L.user_id AND D.id = L.demo_id)
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
        SELECT 
          D.*,
          CASE
                WHEN L.id IS NOT NULL THEN True
                ELSE False
            END AS is_liked,
          json_agg(
              json_build_object(
                  'like_id', L.id,
                  'created', L.created,
                  'user_info', json_build_object(
                      'user_id', U.id,
                      'username', U.username,
                      'thumbnail_url', U.thumbnail_url             
                  )
              ) ORDER BY L.created DESC
          ) AS likes
        FROM demos D
        LEFT JOIN likes L ON D.id = L.demo_id
        LEFT JOIN users U ON L.user_id = U.id
        WHERE D.id = ${id}
        GROUP BY D.id, L.id;
      `;

      if (!res || !res.length) {
        throw new Error("NOT FOUND DEMO ITEM", { cause: 400 });
      }

      return {
        data: res[0],
        message: "SUCCESS",
      };
    } catch (e: any) {
      console.error(e);
      throw e;
    }
  }

  async insert(values: InsertDemo): Promise<CommonResponse<ResponseDemo>> {
    const { VALUES } = this.conn;
    const { QUERY, ROLLBACK, COMMIT } = await this.conn.TRANSACTION();
    try {
      const res = await QUERY`
        INSERT INTO demos ${VALUES(values)}       
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
