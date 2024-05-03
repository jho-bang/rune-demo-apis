import type { InsertDemo, IQuery } from "../../types";
import { DemoRepositories } from "../../repositories";

export class DemoService {
  constructor(private readonly repositories: DemoRepositories) {}

  async getList(query: IQuery) {
    return this.repositories.getList(query);
  }

  async getById(id: number) {
    return this.repositories.getById(id);
  }

  insert(body: InsertDemo) {
    return this.repositories.insert(body);
  }
}
