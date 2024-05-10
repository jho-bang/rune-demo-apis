import type { CommonSchema } from "../common";

export interface UserSchema extends CommonSchema {
  user_id: number;
  sns_id: number;
  sns: string;
  username: string;
  thumbnail_url: string;
}
