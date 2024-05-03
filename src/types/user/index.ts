import type { UserSchema } from "../../db/schema";

export interface IRegisterUser extends Pick<UserSchema, "email" | "password"> {}

export interface ResponseUser extends Partial<UserSchema> {}
