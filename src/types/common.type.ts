export interface IQuery {
  skip?: number;
  limit?: number;
}

export interface CommonResponse<T> {
  data: T;
  message: string;
}
