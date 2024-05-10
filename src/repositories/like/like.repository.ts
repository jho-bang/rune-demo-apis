import type { IPool } from "../../db";

import type { CommonResponse, IInsertLike, IUnLike } from "../../types";

export class LikeRepositories {
  constructor(private readonly conn: IPool) {}

  async like(values: IInsertLike): Promise<CommonResponse<string>> {
    const { VALUES } = this.conn;

    const { QUERY, ROLLBACK, COMMIT } = await this.conn.TRANSACTION();
    try {
      await QUERY`
        INSERT INTO likes ${VALUES(values)}`;

      await QUERY`
        UPDATE demos SET liked_cnt = liked_cnt + 1
        WHERE id = ${values.demo_id}
      `;

      await COMMIT();

      return {
        data: "OK",
        message: "SUCCESS",
      };
    } catch (e: any) {
      await ROLLBACK();
      console.error(e);
      throw e;
    }
  }

  async unlike(values: IUnLike): Promise<CommonResponse<string>> {
    const { QUERY, ROLLBACK, COMMIT } = await this.conn.TRANSACTION();

    try {
      await QUERY`
        DELETE FROM likes WHERE user_id = ${values.user_id} AND demo_id = ${values.demo_id}
      `;

      await QUERY`
        UPDATE demos SET liked_cnt = liked_cnt - 1
        WHERE id = ${values.demo_id}
      `;

      await COMMIT();

      return {
        data: "OK",
        message: "SUCCESS",
      };
    } catch (e) {
      await ROLLBACK();
      console.error(e);
      throw e;
    }
  }
}
