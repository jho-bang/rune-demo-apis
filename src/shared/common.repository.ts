import type { IQuery } from "./common.type";

export abstract class CommonRepository<T, I> {
  protected abstract getList(query: IQuery): Promise<T[]>;
  protected abstract insert(data: I): Promise<void>;
}
