import { DemoRepositories } from "../../repositories/demo/demo.repository";
import type { InsertDemo, IQuery } from "../../types";

export class Service {
  constructor(private readonly repositories: DemoRepositories) {}

  getList(query: IQuery) {
    try {
      return this.repositories.getList(query);
    } catch (e) {
      return [];
    }
  }

  insert({ origin_src }: InsertDemo) {
    try {
      return this.repositories.insert(origin_src);
    } catch (e) {
      return "FAIL";
    }
  }
}
