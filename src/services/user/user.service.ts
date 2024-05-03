import type { UserRepositories } from "../../repositories";

import axios from "axios";

export class UserService {
  constructor(private readonly repositories: UserRepositories) {}

  async getUserByEmail(email: string) {
    return this.repositories.getUserByEmail(email);
  }

  async kakao_profile(access_token: string) {
    try {
      const me = await axios
        .post(`https://kapi.kakao.com/v2/user/me`, null, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => res.data);

      return me;
    } catch (e: any) {
      console.log(e.response.data);
    }
  }
}
