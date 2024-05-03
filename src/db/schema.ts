export interface CommonSchema {
  id: number;
  created: Date;
  updated?: Date;
}

export interface DemoSchema extends CommonSchema {
  origin_src: string;
  new_src: string;
}

export interface UserSchema extends CommonSchema {
  email: string;
  password: string;
}
