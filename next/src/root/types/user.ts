export interface IUser {
  name: string;
  surname: string;
  login: string;
  password: string;
  email: string;
  id: string;
  points_id: string[];
  balance: number;
}

export interface ILogin {
  login: string;
  password: string;
}
