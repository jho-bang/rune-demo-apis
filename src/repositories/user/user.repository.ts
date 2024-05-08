import type { IPool } from "../../db";
import type { IRegisterUser } from "../../types";

export class UserRepositories {
  constructor(private readonly conn: IPool) {}

  async getUserBySns(sns_id: number, sns: string) {
    const { QUERY } = this.conn;
    try {
      const user = await QUERY`
        SELECT * FROM user_table
        WHERE sns_id=${sns_id} AND sns=${sns}
      `;

      if (!sns || !sns.length) {
        throw new Error("NOT FOUND user");
      }

      return user[0];
    } catch (e) {
      throw e;
    }
  }

  async register(body: IRegisterUser) {
    const { VALUES } = this.conn;
    const { QUERY, ROLLBACK, COMMIT } = await this.conn.TRANSACTION();

    try {
      const exists = await QUERY`
        SELECT count(*) FROM user_table
        WHERE sns_id=${body.sns_id} AND sns=${body.sns}
      `;

      const count = exists[0].count;

      if (count !== 0) {
        return COMMIT();
      }

      await QUERY`
        INSERT INTO user_table ${VALUES(body)}        
      `;

      await COMMIT();
    } catch (e: any) {
      console.error(e);
      await ROLLBACK();
      throw e;
    }
  }
}
