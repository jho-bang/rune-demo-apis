import { DemoRepositories } from '../../repositories/demo';
import type { InsertDemo } from '../../types';

export class Service {
  constructor(private readonly repositories: DemoRepositories) {}

  query() {
    return this.repositories.query();
  }

  insert({ origin_src }: InsertDemo) {
    try {
      return this.repositories.insert(origin_src);
    } catch (e) {
      return 'FAIL';
    }
  }
}
