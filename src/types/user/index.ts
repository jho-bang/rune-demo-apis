import type { UserSchema } from "../../db/schema";

export interface IRegisterUser extends Partial<UserSchema> {}

export interface ResponseUser extends Partial<UserSchema> {}
