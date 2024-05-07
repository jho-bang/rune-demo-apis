import type { UserRepositories } from "../../repositories";

import axios from "axios";

export class UserService {
  constructor(private readonly repositories: UserRepositories) {}

  async getUserBySns(sns_id: number, sns: string) {
    return this.repositories.getUserBySns(sns_id, sns);
  }

  async profile(access_token: string) {
    try {
      const me = await axios
        .post(`https://kapi.kakao.com/v2/user/me`, null, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => res.data);

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
