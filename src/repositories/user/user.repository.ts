import type { IPool } from "../../db";
import type { CommonResponse, IRegisterUser, ResponseUser } from "../../types";

export class UserRepositories {
  constructor(private readonly conn: IPool) {}

  async getUserByEmail(email: string): Promise<CommonResponse<ResponseUser>> {
    const { QUERY } = this.conn;

    try {
      const res = await QUERY`
        SELECT email, password FROM user_table
        WHERE email = ${email}
      `;

      if (!res || !res.length) {
        throw new Error("NOT FOUND USER", { cause: 400 });
      }

      return {
        data: res[0],
        message: "SUCCESS",
      };
    } catch (e: any) {
      throw e;
    }
  }

  async register(body: IRegisterUser) {
    const { VALUES } = this.conn;
    const { QUERY, ROLLBACK, COMMIT } = await this.conn.TRANSACTION();

    try {
      const res = await QUERY`
      INSERT INTO user_table ${VALUES(body)}
      RETURNING *
    `;

      await COMMIT();

      return {
        data: res,
        message: "SUCCESS",
      };
    } catch (e: any) {
      console.error(e);
      await ROLLBACK();
      throw e;
    }
  }
}
