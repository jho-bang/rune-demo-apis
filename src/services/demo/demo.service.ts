import { DemoRepositories } from "../../repositories/demo/demo.repository";
import type { InsertDemo } from "../../types";
import type { IQuery } from "../../shared/common.type";

export class Service {
  constructor(private readonly repositories: DemoRepositories) {}

  getList(query: IQuery) {
    return this.repositories.getList(query);
  }

  insert(body: InsertDemo) {
    return this.repositories.insert(body);
  }
}
