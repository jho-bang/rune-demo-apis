import { LikeRepositories } from "../../repositories/like/like.repository";
import type { IInsertLike, IUnLike } from "../../types";

export class LikeService {
  constructor(private readonly repositories: LikeRepositories) {}

  async insertLike(body: IInsertLike) {
    return this.repositories.insert(body);
  }

  async unlike(body: IUnLike) {
    return this.repositories.unlike(body);
  }
}
