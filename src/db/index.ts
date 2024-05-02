import { PostgreSQL } from "fxsql";
const { CONNECT } = PostgreSQL;

export interface IPool {
  VALUES: (
    values: any,
  ) => () => { text: string; values: (...args: any[]) => any };
  IN: any;
  NOT_IN: any;
  EQ: any;
  SET: any;
  COLUMN: any;
  CL: any;
  TABLE: any;
  TB: any;
  SQL: any;
  SQLS: any;
  QUERY: (texts: TemplateStringsArray, ...values: any[]) => any;
  QUERY1: (texts: TemplateStringsArray, ...values: any[]) => any;
  ASSOCIATE: any;
  ASSOCIATE1: any;
  ASSOCIATE_MODULE: any;
  TRANSACTION: any;
}

class DB {
  pool: IPool;
  constructor() {
    this.pool = CONNECT({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
    });

    this.pool.TABLE;
  }
}

export default new DB();
