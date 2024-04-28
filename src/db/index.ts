import { PostgreSQL } from 'fxsql';
const { CONNECT } = PostgreSQL;


export interface IPool {
  TABLE: any
  TB: any
  SQL: any
  QUERY: any
  END: any
}

class DB {
  pool:IPool;
  constructor() {
    this.pool = CONNECT({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
    });
  }
}

export default new DB();
