export interface IQuery {
  skip?: number;
  limit?: number;
}

export interface IListQuery extends IQuery {
  user_id: number;
}

export interface CommonResponse<T> {
  data: T;
  message: string;
}
