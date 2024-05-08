import type { UserRepositories } from "../../repositories";

export class UserService {
  constructor(private readonly repositories: UserRepositories) {}

  async getUserBySns(sns_id: number, sns: string) {
    return this.repositories.getUserBySns(sns_id, sns);
  }

  async profile(access_token: string) {
    try {
      const res = await fetch(`https://kapi.kakao.com/v2/user/me`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const me = await res.json();

      await this.repositories.register({
        sns_id: me.id,
        sns: "kakao",
        username: me.properties.nickname || "",
        thumbnail_url: me.properties.thumbnail_image || "",
      });

      return this.repositories.getUserBySns(me.id, "kakao");
    } catch (e: any) {
      console.log(e.response.data);
    }
  }
}
